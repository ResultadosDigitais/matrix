import React, { useState } from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Checkbox from "@material-ui/core/Checkbox";
import Mic from "@material-ui/icons/Mic";
import MicOff from "@material-ui/icons/MicOff";
import Videocam from "@material-ui/icons/Videocam";
import VideocamOff from "@material-ui/icons/VideocamOff";

const useStyles = makeStyles(() => ({
  toolbar: {
    textAlign: "center",
    minWidth: 260
  },
  sideMargin: {
    marginRight: 8
  }
}));

const EnterMeetingDialog = ({ open, onClose, onConfirm, title }) => {
  const [micEnabled, setMicEnabled] = useState(true);
  const [videoEnabled, setVideoEnabled] = useState(true);
  const classes = useStyles();

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle id="alert-dialog-title">{title}</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          Enter the Matrix with:
        </DialogContentText>
        <div className={classes.toolbar}>
          <Checkbox
            className={classes.sideMargin}
            icon={<MicOff fontSize="large" />}
            checkedIcon={<Mic fontSize="large" />}
            checked={micEnabled}
            onChange={event => {
              setMicEnabled(event.target.checked);
            }}
          />
          <Checkbox
            icon={<VideocamOff fontSize="large" />}
            checkedIcon={<Videocam fontSize="large" />}
            checked={videoEnabled}
            onChange={event => {
              setVideoEnabled(event.target.checked);
            }}
          />
        </div>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Cancel
        </Button>
        <Button
          onClick={() => {
            onConfirm({
              startWithAudioMuted: !micEnabled,
              startWithVideoMuted: !videoEnabled
            });
          }}
          color="primary"
          autoFocus
        >
          Enter
        </Button>
      </DialogActions>
    </Dialog>
  );
};

EnterMeetingDialog.propTypes = {
  title: PropTypes.string,
  open: PropTypes.bool,
  onClose: PropTypes.func,
  onConfirm: PropTypes.func
};

EnterMeetingDialog.defaultProps = {
  title: "",
  open: false,
  onClose: undefined,
  onConfirm: undefined
};

export default EnterMeetingDialog;
