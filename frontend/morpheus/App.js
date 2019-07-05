import React, { useEffect, useState } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { useSnackbar } from "notistack";
import PropTypes from "prop-types";
import axios from "axios";

import Loading from "../components/Loading";
import PageLayout from "../components/PageLayout";
import MenuUsers from "../components/MenuUsers";
import InviteToMeetingDialog from "../components/InviteToMeetingDialog";
import ReceiveInviteDialog from "../components/ReceiveInviteDialog";
import SnackbarActions from "../components/SnackbarActions";
import PageRoutes, { SidebarRouter } from "./Routes";
import {
  initProfile,
  initEvents,
  getCurrentUser,
  emitEnterInRoom,
  isCurrentUserInMeeting,
  emitInviteUser,
  getCurrentRoom
} from "./socket";
import {
  setCurrentUser,
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
  selectUsersFilter
} from "./store/selectors";

const useSocket = (
  toggleLoading,
  setLoggedIn,
  onSetCurrentUser,
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
          onAddRooms(response.data);
          setLoggedIn(true);
          toggleLoading(false);
        })
        .catch(error => {
          onAddError(error);
          toggleLoading(false);
        });
    } else {
      window.location.href = "./";
    }
  }, [toggleLoading, setLoggedIn, onSetCurrentUser, onAddRooms, onAddError]);
};

const useEvents = (
  onSyncOffice,
  onAddUser,
  onRemoveUser,
  onUserEnterMeeting,
  onUserLeftMeeting,
  enqueueSnackbar,
  closeSnackbar,
  isLoggedIn,
  rooms,
  currentUser,
  setReceiveInviteOpen,
  setInvitation
) => {
  useEffect(() => {
    if (isLoggedIn) {
      const events = initEvents(rooms);

      const showNotification = message => {
        enqueueSnackbar(message, {
          action: key => (
            <SnackbarActions
              onDismiss={() => {
                closeSnackbar(key);
              }}
            />
          )
        });
        new Notification(message);
      };

      events.onSyncOffice(usersInRoom => {
        onSyncOffice(usersInRoom);
      });
      events.onParticipantJoined((user, roomId) => {
        onAddUser(user, roomId);
        if (currentUser.id !== user.id) {
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
      });
    }
  }, [
    closeSnackbar,
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
    setReceiveInviteOpen
  ]);
};

const MorpheusApp = ({
  onChangeUsersFilter,
  onSetCurrentUser,
  onAddRooms,
  onSyncOffice,
  onAddUser,
  onAddError,
  onRemoveUser,
  onUserEnterMeeting,
  onUserLeftMeeting,
  history,
  rooms,
  currentUser,
  users,
  usersFilter
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
    isLoggedIn,
    rooms,
    currentUser,
    setReceiveInviteOpen,
    setInvitation
  );

  const currentRoomId = getCurrentRoom();
  const currentRoom = rooms.find(r => r.id === currentRoomId);

  return (
    <>
      <PageLayout
        renderAppBarMenu={() => <SidebarRouter />}
        renderSideBarMenu={() => (
          <MenuUsers
            users={users}
            filter={usersFilter}
            currentUserId={currentUser.id}
            showInviteAction={isCurrentUserInMeeting()}
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
        currentRoomName={currentRoom && currentRoom.name}
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
    </>
  );
};

MorpheusApp.propTypes = {
  onChangeUsersFilter: PropTypes.func,
  onSetCurrentUser: PropTypes.func,
  onAddRooms: PropTypes.func,
  onSyncOffice: PropTypes.func,
  onAddUser: PropTypes.func,
  onAddError: PropTypes.func,
  onRemoveUser: PropTypes.func,
  onUserEnterMeeting: PropTypes.func,
  onUserLeftMeeting: PropTypes.func,
  history: PropTypes.object.isRequired,
  rooms: PropTypes.array.isRequired,
  currentUser: PropTypes.object.isRequired,
  users: PropTypes.array.isRequired,
  usersFilter: PropTypes.object.isRequired
};

MorpheusApp.defaultProps = {
  onChangeUsersFilter: () => {},
  onSetCurrentUser: () => {},
  onAddRooms: () => {},
  onSyncOffice: () => {},
  onAddUser: () => {},
  onAddError: () => {},
  onRemoveUser: () => {},
  onUserEnterMeeting: () => {},
  onUserLeftMeeting: () => {}
};

const mapStateToProps = state => ({
  rooms: selectRooms(state),
  currentUser: selectCurrentUser(state),
  users: selectUsers(state),
  usersFilter: selectUsersFilter(state)
});

const mapDispatchToProps = {
  onChangeUsersFilter: changeUsersFilter,
  onSetCurrentUser: setCurrentUser,
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
