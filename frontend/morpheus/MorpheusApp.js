import React, { useReducer, useEffect, useState } from "react";
import { Switch, Route, withRouter } from "react-router-dom";
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
import { buildProfile, buildEvents } from "./socket";
import {
  initialState,
  reducer,
  changeUserName,
  addRooms,
  syncOffice,
  changeOfficeFilter
} from "./store";

const MorpheusApp = ({ location }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [isLoading, toggleLoading] = useState(true);

  useEffect(() => {
    const profile = buildProfile();

    if (profile.isProfileStored()) {
      axios.get("/rooms").then(response => {
        const rooms = response.data;
        const events = buildEvents(profile, rooms);

        dispatch(addRooms(rooms));
        dispatch(changeUserName(profile.userName()));

        events.onSyncOffice(usersInRoom => {
          dispatch(syncOffice(usersInRoom));
        });

        toggleLoading(false);
      });
    } else {
      window.location.href = "./";
    }
  }, []);

  const { office, filter, users } = state;
  const title =
    location.state && location.state.room ? location.state.room.name : "Matrix";

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
                  filter={filter}
                  onChangeFilter={(key, value) => {
                    dispatch(changeOfficeFilter(key, value));
                  }}
                />
                <MenuAuth userName={state.userName} />
              </>
            )}
          />
          <Route path="/morpheus/office" exact render={() => <MenuRoom />} />
        </Switch>
      )}
      renderSideBarMenu={() => <MenuUsers users={users} />}
    >
      {isLoading ? (
        <Loading />
      ) : (
        <Switch>
          <Route
            path="/morpheus"
            exact
            render={routeProps => (
              <MorpheusOffice {...routeProps} office={office} />
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
