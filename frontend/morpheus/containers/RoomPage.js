/* global JitsiMeetExternalAPI */

import React, { useState, useEffect, useRef } from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";

import EnterMeetingDialog from "../../components/EnterMeetingDialog";
import Loading from "../../components/Loading";
import { selectRooms } from "../store/selectors";
import {
  getCurrentRoom,
  emitEnterInRoom,
  emitStartMeeting,
  emitLeftMeeting
} from "../socket";

const useStyles = makeStyles(() => ({
  root: {
    height: "100%",
    backgroundColor: "#000"
  },
  frame: {
    position: "relative",
    height: "100%"
  }
}));

const getMeetingOptions = (roomId, parentNode, config) => {
  return {
    roomName: `${roomId}-${window.location.hostname}`,
    width: "100%",
    height: "100%",
    parentNode,
    configOverwrite: {
      preferH264: true,
      resolution: 360,
      constraints: {
        video: {
          ideal: 360,
          max: 360
        }
      },
      ...config
    },
    interfaceConfigOverwrite: {
      DISABLE_VIDEO_BACKGROUND: true,
      TOOLBAR_BUTTONS: [
        "microphone",
        "camera",
        "closedcaptions",
        "desktop",
        "fullscreen",
        "fodeviceselection",
        "hangup",
        "profile",
        "etherpad",
        "sharedvideo",
        "settings",
        "raisehand",
        "videoquality",
        "filmstrip",
        "stats",
        "shortcuts",
        "tileview",
        "chat"
        // 'recording', 'livestreaming', 'invite', 'feedback',
      ]
    }
  };
};

const RoomPage = ({ history, match, rooms }) => {
  const [isLoading, setLoading] = useState(true);
  const [isMeetingDialogOpen, setMeetingDialogOpen] = useState(false);
  const [room, setRoom] = useState();
  const meetRef = useRef(null);
  const classes = useStyles();

  useEffect(() => {
    if (rooms && rooms.length > 0) {
      const findResult = rooms.find(r => r.id === match.params.roomId);
      if (findResult) {
        setRoom(findResult);
        setLoading(false);
        setMeetingDialogOpen(true);
      }
    }
  }, [rooms, match.params.roomId, room]);

  const enterMeeting = config => {
    const { roomId } = match.params;
    const domain = "meet.jit.si";
    const options = getMeetingOptions(roomId, meetRef.current, config);

    if (getCurrentRoom() !== roomId) {
      emitEnterInRoom(roomId);
    }

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
        title={room.name}
        open={isMeetingDialogOpen}
        onClose={() => {
          setMeetingDialogOpen(false);
          history.push("/morpheus/");
        }}
        onConfirm={config => {
          setMeetingDialogOpen(false);
          enterMeeting(config);
        }}
      />
    </div>
  );
};

RoomPage.propTypes = {
  history: PropTypes.object.isRequired,
  match: PropTypes.object.isRequired,
  rooms: PropTypes.array
};

RoomPage.defaultProps = {
  rooms: []
};

const mapStateToProps = state => ({
  rooms: selectRooms(state)
});

export default connect(mapStateToProps)(RoomPage);
