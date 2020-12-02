import React, { useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";

import RoomCard from "../../components/RoomCard";
import RoomGroup from "../../components/RoomGroup";

import {
  selectOffice,
  selectCurrentRoom,
  selectRooms
} from "../store/selectors";
import { emitEnterInRoom, emitStartMeeting, emitLeftMeeting} from "../socket";
import { setCurrentRoom } from "../store/actions";
import { CurrentRoomPropType } from "../store/models";

let activeMonitorInterval;

const externalMeetRoomMonitoring = (externalMeetRoom) => {
  window.clearInterval(activeMonitorInterval);

  activeMonitorInterval = window.setInterval(() => {
    if (!externalMeetRoom.closed) return;

    emitLeftMeeting();
    window.clearInterval(activeMonitorInterval);
  }, 1000);
};

const startMeeting = (redirectUrl, history, openInNewTab = false) => {
  if (openInNewTab) {
    window.open(redirectUrl, "_blank");
  } else {
    history.push(redirectUrl);
  }
};

export const enterRoom = (room, history, openInNewTab = false) => {
  emitEnterInRoom(room.id);

  if(room.externalMeetUrl) {
    emitStartMeeting();
    const externalMeetRoom = window.open(room.externalMeetUrl);

    externalMeetRoomMonitoring(externalMeetRoom);
  } else {
    startMeeting(`/morpheus/room/${room.id}`, history, openInNewTab);
  }
};

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(3),
    flexGrow: 1
  },
}));

const OfficePage = ({
  onSetCurrentRoom,
  history,
  match,
  office,
  rooms,
  currentRoom
}) => {
  const classes = useStyles();
  useState(() => {
    if (currentRoom && match.params.roomId !== currentRoom.id) {
      const findResult = rooms.find(r => r.id === match.params.roomId);
      if (findResult) {
        emitEnterInRoom(findResult.id);
        onSetCurrentRoom(findResult);
      } else {
        history.push("/morpheus/");
      }
    }
  }, [match.params.roomId]);

  const roomGroups = office.reduce((rv, room) => {
    const group = room.group || "ungrouped";
    // eslint-disable-next-line no-param-reassign
    if (!rv[group]) rv[group] = [];
    rv[group].push(room);
    return rv;
  }, { "ungrouped": [] });

  return (
    <div className={classes.root}>
      {( Object.keys(roomGroups).map(group => (
        <RoomGroup
          key={group}
          name={group}
        >
          {roomGroups[group].map((room) => (
            <RoomCard
              {...room}
              key={room.id}
              onEnterRoom={() => {
                emitEnterInRoom(room.id);
                onSetCurrentRoom(room);
                history.replace(`/morpheus/office/${room.id}`);
              }}
              onEnterMeeting={(event) => {
                onSetCurrentRoom(room);
                const openInNewTab = event.ctrlKey
                enterRoom(room, history, openInNewTab);
              }}
            />
          ))}
        </RoomGroup>
      )) )}
    </div>
  );
};

OfficePage.propTypes = {
  onSetCurrentRoom: PropTypes.func,
  office: PropTypes.arrayOf(PropTypes.object),
  rooms: PropTypes.arrayOf(PropTypes.object),
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
    replace: PropTypes.func.isRequired
  }).isRequired,
  match: PropTypes.shape({
    params: PropTypes.shape({
      roomId: PropTypes.string
    }).isRequired
  }).isRequired,
  currentRoom: CurrentRoomPropType
};

OfficePage.defaultProps = {
  onSetCurrentRoom: () => {},
  office: [],
  rooms: [],
  currentRoom: {}
};

const mapStateToProps = state => ({
  office: selectOffice(state),
  rooms: selectRooms(state),
  currentRoom: selectCurrentRoom(state)
});

const mapDispatchToProps = {
  onSetCurrentRoom: setCurrentRoom
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(OfficePage);
