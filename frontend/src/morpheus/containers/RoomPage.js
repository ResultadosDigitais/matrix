/* global JitsiMeetExternalAPI */

import React, { useState, useEffect, useRef } from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";

import Loading from "../../components/Loading";
import {
  selectRooms,
  selectCurrentRoom,
  selectMeetingSettings
} from "../store/selectors";
import { emitEnterInRoom, emitStartMeeting, emitLeftMeeting } from "../socket";
import { setCurrentRoom } from "../store/actions";
import { RoomsPropType, CurrentRoomPropType } from "../store/models";
import EnterMeetingDialog from "./EnterMeetingDialog";
import { adaptJitsiConfig } from "../../jitsi/JitsiConfig";

const useStyles = makeStyles(() => ({
  root: {
    height: "100%",
    backgroundColor: "#000"
  },
  frame: {
    position: "relative",
    height: "calc(100% - 3px)"
  }
}));

const RoomPage = ({
  onSetCurrentRoom,
  history,
  match,
  rooms,
  currentRoom,
  meetingSettings
}) => {
  const [isLoading, setLoading] = useState(true);
  const [isMeetingDialogOpen, setMeetingDialogOpen] = useState(false);
  const meetRef = useRef(null);
  const classes = useStyles();

  useEffect(() => {
    if (rooms && rooms.length > 0) {
      if (currentRoom.id !== match.params.roomId) {
        const findResult = rooms.find(r => r.id === match.params.roomId);

        if (findResult) {
          emitEnterInRoom(findResult.id);
          onSetCurrentRoom(findResult);
        } else {
          history.push("/morpheus");
        }
      } else {
        setLoading(false);
        setMeetingDialogOpen(true);
      }
    }
  }, [rooms, currentRoom, match.params.roomId, onSetCurrentRoom, history]);

  const enterMeeting = () => {
    const { roomId } = match.params;
    const domain = "meet.jit.si";
    const options = adaptJitsiConfig(roomId, meetRef.current, meetingSettings);

    emitStartMeeting();

    const api = new JitsiMeetExternalAPI(domain, options);

    api.addEventListener("videoConferenceLeft", () => {
      emitLeftMeeting();
      history.push("/morpheus/");
    });
  };

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className={classes.root}>
      <div className={classes.frame} ref={meetRef} />
      <EnterMeetingDialog
        title={currentRoom.name}
        open={isMeetingDialogOpen}
        onClose={() => {
          setMeetingDialogOpen(false);
          history.push("/morpheus/");
        }}
        onConfirm={() => {
          setMeetingDialogOpen(false);
          enterMeeting();
        }}
      />
    </div>
  );
};

RoomPage.propTypes = {
  onSetCurrentRoom: PropTypes.func,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired
  }).isRequired,
  match: PropTypes.shape({
    params: PropTypes.shape({
      roomId: PropTypes.string
    }).isRequired
  }).isRequired,
  rooms: RoomsPropType,
  currentRoom: CurrentRoomPropType,
  meetingSettings: PropTypes.shape()
};

RoomPage.defaultProps = {
  onSetCurrentRoom: () => {},
  rooms: [],
  currentRoom: {},
  meetingSettings: {}
};

const mapStateToProps = state => ({
  rooms: selectRooms(state),
  currentRoom: selectCurrentRoom(state),
  meetingSettings: selectMeetingSettings(state)
});

const mapDispatchToProps = {
  onSetCurrentRoom: setCurrentRoom
};

export default connect(mapStateToProps, mapDispatchToProps)(RoomPage);
