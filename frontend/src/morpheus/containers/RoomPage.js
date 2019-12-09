/* global JitsiMeetExternalAPI */

import React, { useState, useEffect, useRef } from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";

import EnterMeetingDialog from "../../components/EnterMeetingDialog";
import Loading from "../../components/Loading";
import { selectRooms, selectCurrentRoom } from "../store/selectors";
import { emitEnterInRoom, emitStartMeeting, emitLeftMeeting } from "../socket";
import { setCurrentRoom } from "../store/actions";
import { RoomsPropType, CurrentRoomPropType } from "../store/models";

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

const getMeetingOptions = (roomId, parentNode, config) => {
  return {
    roomName: `${roomId}-${window.location.hostname}`,
    width: "100%",
    height: "100%",
    parentNode,
    configOverwrite: {
      ...config,
      resolution: 180,
      constraints: {
        video: {
          aspectRatio: 16 / 9,
          height: {
            ideal: 180,
            max: 180,
            min: 180
          }
        }
      }
    },
    interfaceConfigOverwrite: {
      filmStripOnly: false
    }
  };
};

const RoomPage = ({ onSetCurrentRoom, history, match, rooms, currentRoom }) => {
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

  const enterMeeting = config => {
    const { roomId } = match.params;
    const domain = "meet.jit.si";
    const options = getMeetingOptions(roomId, meetRef.current, config);

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
        onConfirm={config => {
          setMeetingDialogOpen(false);
          enterMeeting(config);
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
  currentRoom: CurrentRoomPropType
};

RoomPage.defaultProps = {
  onSetCurrentRoom: () => {},
  rooms: [],
  currentRoom: {}
};

const mapStateToProps = state => ({
  rooms: selectRooms(state),
  currentRoom: selectCurrentRoom(state)
});

const mapDispatchToProps = {
  onSetCurrentRoom: setCurrentRoom
};

export default connect(mapStateToProps, mapDispatchToProps)(RoomPage);
