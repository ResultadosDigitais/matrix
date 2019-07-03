import React, { useEffect, useState } from "react";
import { Switch, Route, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { useSnackbar } from "notistack";
import PropTypes from "prop-types";
import axios from "axios";

import PageLayout from "../components/PageLayout";
import Loading from "../components/Loading";
import MenuUsers from "../components/MenuUsers";
import MenuOffice from "../components/MenuOffice";
import MenuRoom from "../components/MenuRoom";
import MenuAuth from "../components/MenuAuth";
import InviteToMeetingDialog from "../components/InviteToMeetingDialog";
import ReceiveInviteDialog from "../components/ReceiveInviteDialog";
import MorpheusOffice from "./MorpheusOffice";
import MorpheusRoom from "./MorpheusRoom";
import { buildDefaultAction } from "./snackbar";
import {
  initProfile,
  initEvents,
  getCurrentUser,
  emitEnterInRoom,
  emitExitRoom,
  isCurrentUserInMeeting,
  emitInviteUser
} from "./socket";
import {
  setCurrentUser,
  addRooms,
  syncOffice,
  changeOfficeFilter,
  changeUsersFilter,
  addUser,
  addError,
  removeUser
} from "./store/actions";
import {
  selectRooms,
  selectCurrentUser,
  selectOffice,
  selectOfficeFilter,
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
  enqueueSnackbar,
  closeSnackbar,
  isLoggedIn,
  rooms,
  currentUser,
  setReceiveInviteOpen,
  setInvitation,
  onSyncOffice,
  onAddUser,
  onRemoveUser
) => {
  useEffect(() => {
    if (isLoggedIn) {
      const events = initEvents(rooms);

      const showNotification = message => {
        enqueueSnackbar(message, { action: buildDefaultAction(closeSnackbar) });
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
      events.onParticipantStartedMeet((user, room) => {
        console.log("onParticipantStartedMeet", user, room);
      });
      events.onParticipantLeftMeet((user, room) => {
        console.log("onParticipantLeftMeet", user, room);
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
    rooms,
    setInvitation,
    setReceiveInviteOpen
  ]);
};

const MorpheusApp = ({
  onChangeOfficeFilter,
  onChangeUsersFilter,
  onSetCurrentUser,
  onAddRooms,
  onSyncOffice,
  onAddUser,
  onAddError,
  onRemoveUser,
  history,
  location,
  rooms,
  currentUser,
  office,
  officeFilter,
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
    enqueueSnackbar,
    closeSnackbar,
    isLoggedIn,
    rooms,
    currentUser,
    setReceiveInviteOpen,
    setInvitation,
    onSyncOffice,
    onAddUser,
    onRemoveUser
  );

  const currentRoomName =
    location &&
    location.state &&
    location.state.room &&
    location.state.room.name;
  const title = currentRoomName || "Matrix";

  return (
    <>
      <PageLayout
        title={title}
        renderAppBarMenu={() => (
          <Switch>
            <Route
              path="/morpheus"
              exact
              render={() => (
                <>
                  <MenuOffice
                    filter={officeFilter}
                    onChangeFilter={(key, value) => {
                      onChangeOfficeFilter(key, value);
                    }}
                  />
                  <MenuAuth userName={currentUser.name} />
                </>
              )}
            />
            <Route
              path="/morpheus/office"
              exact
              render={routeProps => (
                <MenuRoom
                  {...routeProps}
                  onExit={() => {
                    emitExitRoom();
                  }}
                />
              )}
            />
          </Switch>
        )}
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
        {isLoading ? (
          <Loading />
        ) : (
          <Switch>
            <Route
              path="/morpheus"
              exact
              render={routeProps => (
                <MorpheusOffice
                  {...routeProps}
                  office={office}
                  onUserEnterRoom={room => {
                    emitEnterInRoom(room.id);
                  }}
                />
              )}
            />
            <Route
              path="/morpheus/office"
              exact
              render={routeProps => (
                <MorpheusRoom {...routeProps} office={office} />
              )}
            />
          </Switch>
        )}
      </PageLayout>
      <InviteToMeetingDialog
        open={isInviteModalOpen}
        user={userToInvite}
        currentRoomName={currentRoomName}
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
          history.push("/morpheus/office", {
            room: invitation.room
          });
        }}
      />
    </>
  );
};

MorpheusApp.propTypes = {
  onChangeOfficeFilter: PropTypes.func,
  onChangeUsersFilter: PropTypes.func,
  onSetCurrentUser: PropTypes.func,
  onAddRooms: PropTypes.func,
  onSyncOffice: PropTypes.func,
  onAddUser: PropTypes.func,
  onAddError: PropTypes.func,
  onRemoveUser: PropTypes.func,
  location: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  rooms: PropTypes.array.isRequired,
  currentUser: PropTypes.object.isRequired,
  office: PropTypes.array.isRequired,
  officeFilter: PropTypes.object.isRequired,
  users: PropTypes.array.isRequired,
  usersFilter: PropTypes.object.isRequired
};

MorpheusApp.defaultProps = {
  onChangeOfficeFilter: () => {},
  onChangeUsersFilter: () => {},
  onSetCurrentUser: () => {},
  onAddRooms: () => {},
  onSyncOffice: () => {},
  onAddUser: () => {},
  onAddError: () => {},
  onRemoveUser: () => {}
};

const mapStateToProps = state => ({
  rooms: selectRooms(state),
  currentUser: selectCurrentUser(state),
  office: selectOffice(state),
  officeFilter: selectOfficeFilter(state),
  users: selectUsers(state),
  usersFilter: selectUsersFilter(state)
});

const mapDispatchToProps = {
  onChangeOfficeFilter: changeOfficeFilter,
  onChangeUsersFilter: changeUsersFilter,
  onSetCurrentUser: setCurrentUser,
  onAddRooms: addRooms,
  onSyncOffice: syncOffice,
  onAddUser: addUser,
  onAddError: addError,
  onRemoveUser: removeUser
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(MorpheusApp)
);
