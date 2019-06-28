import React, { useReducer, useEffect, useState } from "react";
import axios from "axios";

import PageLayout from "../../components/PageLayout";
import Loading from "../../components/Loading";
import MenuUsers from "../../components/MenuUsers";
import MenuOffice from "../../components/MenuOffice";
import Grid from "../../components/Grid";
import Room from "../../components/Room";
import {
  initialState,
  reducer,
  changeUserName,
  addRooms,
  syncOffice,
  changeFilter
} from "./store";
import { buildProfile, buildEvents } from "./socket";
import MenuAuth from "../../components/MenuAuth";

const MorpheusPage = () => {
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

  return (
    <PageLayout
      renderAppBarMenu={() => (
        <>
          <MenuOffice
            filter={filter}
            onChangeFilter={(key, value) => {
              dispatch(changeFilter(key, value));
            }}
          />
          <MenuAuth userName={state.userName} />
        </>
      )}
      renderSideBarMenu={() => <MenuUsers users={users} />}
    >
      {isLoading ? (
        <Loading />
      ) : (
        <Grid>
          {office.map(room => (
            <Room key={room.id} {...room} />
          ))}
        </Grid>
      )}
    </PageLayout>
  );
};

export default MorpheusPage;
