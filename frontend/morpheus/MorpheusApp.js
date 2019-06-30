import React, { useReducer, useEffect, useState } from "react";
import { Switch, Route, withRouter } from "react-router-dom";
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
  initialState,
  reducer,
  setCurrentUser,
  addRooms,
  syncOffice,
  changeOfficeFilter,
  changeUsersFilter,
  addUser,
  addError,
  removeUser
} from "./store";

const useSocket = (dispatch, toggleLoading, setLoggedIn) => {
  useEffect(() => {
    const profile = initProfile();

    if (profile.isProfileStored()) {
      dispatch(setCurrentUser(getCurrentUser()));

      axios
        .get("/rooms")
        .then(response => {
          dispatch(addRooms(response.data));
          setLoggedIn(true);
          toggleLoading(false);
        })
        .catch(error => {
          dispatch(addError(error));
          toggleLoading(false);
        });
    } else {
      window.location.href = "./";
    }
  }, [dispatch, toggleLoading, setLoggedIn]);
};

const useEvents = (
  dispatch,
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
        enqueueSnackbar(message, { action: buildDefaultAction(closeSnackbar) });
        new Notification(message);
      };

      events.onSyncOffice(usersInRoom => {
        dispatch(syncOffice(usersInRoom));
      });
      events.onParticipantJoined((user, roomId) => {
        dispatch(addUser(user, roomId));
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
        dispatch(removeUser(userId));
      });
      events.onParticipantIsCalled((user, roomId) => {
        const room = rooms.find(r => r.id === roomId);
        setReceiveInviteOpen(true);
        setInvitation({ user, room });
      });
    }
  }, [
    dispatch,
    enqueueSnackbar,
    closeSnackbar,
    isLoggedIn,
    rooms,
    currentUser,
    setReceiveInviteOpen,
    setInvitation
  ]);
};

const MorpheusApp = ({ history, location }) => {
  const [isLoggedIn, setLoggedIn] = useState(false);
  const [state, dispatch] = useReducer(reducer, initialState);
  const [isLoading, toggleLoading] = useState(true);
  const [isInviteModalOpen, setInviteModalOpen] = useState(false);
  const [userToInvite, setUserToInvite] = useState();
  const [isReceiveInviteOpen, setReceiveInviteOpen] = useState(false);
  const [invitation, setInvitation] = useState();
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  useSocket(dispatch, toggleLoading, setLoggedIn);
  useEvents(
    dispatch,
    enqueueSnackbar,
    closeSnackbar,
    isLoggedIn,
    state.rooms,
    state.currentUser,
    setReceiveInviteOpen,
    setInvitation
  );

  const { office, officeFilter, users, usersFilter, currentUser } = state;
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
                      dispatch(changeOfficeFilter(key, value));
                    }}
                  />
                  <MenuAuth userName={state.userName} />
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
              dispatch(changeUsersFilter(key, value));
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
  location: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired
};

export default withRouter(MorpheusApp);
