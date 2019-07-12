import React, { useEffect, useState } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { useSnackbar } from "notistack";
import PropTypes from "prop-types";
import axios from "axios";
import debounce from "lodash.debounce";

import Loading from "../components/Loading";
import PageLayout from "../components/PageLayout";
import MenuUsers from "../components/MenuUsers";
import InviteToMeetingDialog from "../components/InviteToMeetingDialog";
import ReceiveInviteDialog from "../components/ReceiveInviteDialog";
import MessageDialog from "../components/MessageDialog";
import SnackbarActions from "../components/SnackbarActions";
import Error500 from "../components/Error500";
import PageRoutes, { AppBarRouter } from "./Routes";
import { showBrowserNotification } from "../notification";
import {
  initProfile,
  initEvents,
  closeConnection,
  getCurrentUser,
  emitEnterInRoom,
  emitInviteUser,
  getCurrentRoomId
} from "./socket";
import {
  setCurrentUser,
  setCurrentRoom,
  addRooms,
  syncOffice,
  changeUsersFilter,
  addUser,
  addError,
  removeUser,
  userEnterMeeting,
  userLeftMeeting
} from "./store/actions";
import {
  selectRooms,
  selectCurrentUser,
  selectUsers,
  selectUsersFilter,
  selectCurrentRoom,
  selectError,
  selectSettings
} from "./store/selectors";
import {
  CurrentRoomPropType,
  RoomsPropType,
  CurrentUserPropType,
  SettingsPropType,
  UsersPropType,
  UsersFilterPropType,
  ErrorPropType
} from "./store/models";

const useSocket = (
  toggleLoading,
  setLoggedIn,
  onSetCurrentUser,
  onSetCurrentRoom,
  onAddRooms,
  onAddError
) => {
  useEffect(() => {
    const profile = initProfile();

    if (profile.isProfileStored()) {
      onSetCurrentUser(getCurrentUser());

      axios
        .get("/rooms")
        .then(response => {
          const rooms = response.data;
          const savedRoomId = getCurrentRoomId();
          let currentRoom = rooms.find(r => r.id === savedRoomId);

          if (!currentRoom) {
            [currentRoom] = rooms;
            emitEnterInRoom(currentRoom.id);
          }

          onAddRooms(rooms);
          onSetCurrentRoom(currentRoom);
          setLoggedIn(true);
          toggleLoading(false);
        })
        .catch(error => {
          onAddError(error);
          toggleLoading(false);
        });
    } else {
      window.location.href = "/";
    }
  }, [
    toggleLoading,
    setLoggedIn,
    onSetCurrentUser,
    onAddRooms,
    onAddError,
    onSetCurrentRoom
  ]);
};

const useEvents = (
  onSyncOffice,
  onAddUser,
  onRemoveUser,
  onUserEnterMeeting,
  onUserLeftMeeting,
  enqueueSnackbar,
  closeSnackbar,
  setReceiveInviteOpen,
  setInvitation,
  isLoggedIn,
  rooms,
  settings,
  currentUser,
  currentRoom
) => {
  useEffect(() => {
    if (isLoggedIn) {
      const events = initEvents(rooms);

      const showNotification = debounce(message => {
        if (!settings.notificationDisabled) {
          enqueueSnackbar(message, {
            action: key => (
              <SnackbarActions
                onDismiss={() => {
                  closeSnackbar(key);
                }}
              />
            )
          });
          showBrowserNotification(message);
        }
      }, 500);

      events.onSyncOffice(usersInRoom => {
        onSyncOffice(usersInRoom);
      });
      events.onParticipantJoined((user, roomId) => {
        onAddUser(user, roomId);
        if (currentUser.id !== user.id && currentRoom.id === roomId) {
          const room = rooms.find(r => r.id === roomId);
          showNotification(`${user.name} entered the ${room.name}.`);
        }
      });
      events.onParticipantStartedMeet((user, roomId) => {
        onUserEnterMeeting(user, roomId);
      });
      events.onParticipantLeftMeet((user, roomId) => {
        onUserLeftMeeting(user, roomId);
      });
      events.onDisconnect(userId => {
        onRemoveUser(userId);
      });
      events.onParticipantIsCalled((user, roomId) => {
        const room = rooms.find(r => r.id === roomId);
        setReceiveInviteOpen(true);
        setInvitation({ user, room });
        if (!settings.notificationDisabled) {
          showBrowserNotification(
            `${user.name} is inviting you to ${room.name}`
          );
        }
      });
    }

    return () => {
      closeConnection();
    };
  }, [
    closeSnackbar,
    currentRoom.id,
    currentUser.id,
    enqueueSnackbar,
    isLoggedIn,
    onAddUser,
    onRemoveUser,
    onSyncOffice,
    onUserEnterMeeting,
    onUserLeftMeeting,
    rooms,
    setInvitation,
    setReceiveInviteOpen,
    settings.notificationDisabled
  ]);
};

const MorpheusApp = ({
  onChangeUsersFilter,
  onSetCurrentUser,
  onSetCurrentRoom,
  onAddRooms,
  onSyncOffice,
  onAddUser,
  onAddError,
  onRemoveUser,
  onUserEnterMeeting,
  onUserLeftMeeting,
  history,
  currentRoom,
  settings,
  rooms,
  currentUser,
  users,
  usersFilter,
  error
}) => {
  const [isLoggedIn, setLoggedIn] = useState(false);
  const [isLoading, toggleLoading] = useState(true);
  const [isInviteModalOpen, setInviteModalOpen] = useState(false);
  const [userToInvite, setUserToInvite] = useState();
  const [isReceiveInviteOpen, setReceiveInviteOpen] = useState(false);
  const [invitation, setInvitation] = useState();
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  useSocket(
    toggleLoading,
    setLoggedIn,
    onSetCurrentUser,
    onSetCurrentRoom,
    onAddRooms,
    onAddError
  );
  useEvents(
    onSyncOffice,
    onAddUser,
    onRemoveUser,
    onUserEnterMeeting,
    onUserLeftMeeting,
    enqueueSnackbar,
    closeSnackbar,
    setReceiveInviteOpen,
    setInvitation,
    isLoggedIn,
    rooms,
    settings,
    currentUser,
    currentRoom
  );

  if (error) {
    return (
      <Error500
        onReload={() => {
          window.location.reload();
        }}
      />
    );
  }

  return (
    <>
      <PageLayout
        renderAppBarMenu={() => <AppBarRouter />}
        renderSideBarMenu={() => (
          <MenuUsers
            users={users}
            filter={usersFilter}
            currentUser={currentUser}
            currentRoom={currentRoom}
            onChangeFilter={(key, value) => {
              onChangeUsersFilter(key, value);
            }}
            onInviteUser={user => {
              setUserToInvite(user);
              setInviteModalOpen(true);
            }}
          />
        )}
      >
        {isLoading ? <Loading /> : <PageRoutes />}
      </PageLayout>
      <InviteToMeetingDialog
        open={isInviteModalOpen}
        user={userToInvite}
        currentRoomName={currentRoom.name}
        onClose={() => {
          setInviteModalOpen(false);
        }}
        onConfirm={() => {
          emitInviteUser(userToInvite.id);
        }}
      />
      <ReceiveInviteDialog
        open={isReceiveInviteOpen}
        invitation={invitation}
        onClose={() => {
          setReceiveInviteOpen(false);
        }}
        onConfirm={() => {
          emitEnterInRoom(invitation.room.id);
          history.push(`/morpheus/room/${invitation.room.id}`);
        }}
      />
      <MessageDialog />
    </>
  );
};

MorpheusApp.propTypes = {
  onChangeUsersFilter: PropTypes.func,
  onSetCurrentUser: PropTypes.func,
  onSetCurrentRoom: PropTypes.func,
  onAddRooms: PropTypes.func,
  onSyncOffice: PropTypes.func,
  onAddUser: PropTypes.func,
  onAddError: PropTypes.func,
  onRemoveUser: PropTypes.func,
  onUserEnterMeeting: PropTypes.func,
  onUserLeftMeeting: PropTypes.func,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired
  }).isRequired,
  currentRoom: CurrentRoomPropType.isRequired,
  rooms: RoomsPropType.isRequired,
  currentUser: CurrentUserPropType.isRequired,
  users: UsersPropType.isRequired,
  usersFilter: UsersFilterPropType.isRequired,
  settings: SettingsPropType.isRequired,
  error: ErrorPropType
};

MorpheusApp.defaultProps = {
  onChangeUsersFilter: () => {},
  onSetCurrentUser: () => {},
  onSetCurrentRoom: () => {},
  onAddRooms: () => {},
  onSyncOffice: () => {},
  onAddUser: () => {},
  onAddError: () => {},
  onRemoveUser: () => {},
  onUserEnterMeeting: () => {},
  onUserLeftMeeting: () => {},
  error: undefined
};

const mapStateToProps = state => ({
  currentRoom: selectCurrentRoom(state),
  rooms: selectRooms(state),
  currentUser: selectCurrentUser(state),
  users: selectUsers(state),
  usersFilter: selectUsersFilter(state),
  settings: selectSettings(state),
  error: selectError(state)
});

const mapDispatchToProps = {
  onChangeUsersFilter: changeUsersFilter,
  onSetCurrentUser: setCurrentUser,
  onSetCurrentRoom: setCurrentRoom,
  onAddRooms: addRooms,
  onSyncOffice: syncOffice,
  onAddUser: addUser,
  onAddError: addError,
  onRemoveUser: removeUser,
  onUserEnterMeeting: userEnterMeeting,
  onUserLeftMeeting: userLeftMeeting
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(MorpheusApp)
);
