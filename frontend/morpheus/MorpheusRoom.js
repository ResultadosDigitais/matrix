/* global JitsiMeetExternalAPI */

import React, { useEffect, useRef } from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";

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

const MorpheusRoom = ({ location }) => {
  const meetRef = useRef(null);
  const classes = useStyles();

  useEffect(() => {
    const config =
      location.state && location.state.config ? location.state.config : {};
    const domain = "meet.jit.si";
    const options = getMeetingOptions("baconx", meetRef.current, config);

    const api = new JitsiMeetExternalAPI(domain, options);
  }, [location.state]);

  return (
    <div className={classes.root}>
      <div className={classes.frame} ref={meetRef} />
    </div>
  );
};

MorpheusRoom.propTypes = {
  location: PropTypes.object.isRequired
};

export default MorpheusRoom;
