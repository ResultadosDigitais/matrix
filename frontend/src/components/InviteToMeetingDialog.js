import React from "react";
import PropTypes from "prop-types";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

const InviteToMeetingDialog = ({
  open,
  onClose,
  onConfirm,
  user,
  currentRoomName
}) => (
  <Dialog open={open} onClose={onClose}>
    <DialogTitle id="alert-dialog-title">User invite</DialogTitle>
    <DialogContent>
      <DialogContentText id="alert-dialog-description">
        Invite {user.name} to {currentRoomName}?
      </DialogContentText>
    </DialogContent>
    <DialogActions>
      <Button onClick={onClose} color="primary">
        Cancel
      </Button>
      <Button
        onClick={() => {
          onClose();
          onConfirm();
        }}
        color="primary"
        autoFocus
      >
        Invite
      </Button>
    </DialogActions>
  </Dialog>
);

InviteToMeetingDialog.propTypes = {
  user: PropTypes.shape({
    name: PropTypes.string
  }),
  open: PropTypes.bool,
  onClose: PropTypes.func,
  onConfirm: PropTypes.func,
  currentRoomName: PropTypes.string
};

InviteToMeetingDialog.defaultProps = {
  user: {},
  open: false,
  onClose: undefined,
  onConfirm: undefined,
  currentRoomName: undefined
};

export default InviteToMeetingDialog;
