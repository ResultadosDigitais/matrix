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
import MorpheusOffice from "./MorpheusOffice";
import MorpheusRoom from "./MorpheusRoom";
import { buildDefaultAction } from "./snackbar";
import {
  initProfile,
  initEvents,
  getCurrentUser,
  emitEnterInRoom,
  emitExitRoom
} from "./socket";
import {
  initialState,
  reducer,
  changeUserName,
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
      dispatch(changeUserName(profile.userName()));

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
  rooms
) => {
  useEffect(() => {
    if (isLoggedIn) {
      const events = initEvents(rooms);
      const currentUser = getCurrentUser();

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
      events.onParticipantIsCalled((user, room) => {
        console.log("onParticipantIsCalled", user, room);
      });
    }
  }, [dispatch, enqueueSnackbar, closeSnackbar, isLoggedIn, rooms]);
};

const MorpheusApp = ({ location }) => {
  const [isLoggedIn, setLoggedIn] = useState(false);
  const [state, dispatch] = useReducer(reducer, initialState);
  const [isLoading, toggleLoading] = useState(true);
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  useSocket(dispatch, toggleLoading, setLoggedIn);
  useEvents(dispatch, enqueueSnackbar, closeSnackbar, isLoggedIn, state.rooms);

  const { office, officeFilter, users, usersFilter } = state;
  const title =
    location && location.state && location.state.room
      ? location.state.room.name
      : "Matrix";

  return (
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
          onChangeFilter={(key, value) => {
            dispatch(changeUsersFilter(key, value));
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
  );
};

MorpheusApp.propTypes = {
  location: PropTypes.object.isRequired
};

export default withRouter(MorpheusApp);
