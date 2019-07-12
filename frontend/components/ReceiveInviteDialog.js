import React from "react";
import PropTypes from "prop-types";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

const ReceiveInviteDialog = ({ open, onClose, onConfirm, invitation }) => (
  <Dialog open={open} onClose={onClose}>
    <DialogTitle>You have an invitation</DialogTitle>
    <DialogContent>
      <DialogContentText>
        {invitation.user && invitation.user.name} invited you to{" "}
        {invitation.room && invitation.room.name}. Do you want to accept it?
      </DialogContentText>
    </DialogContent>
    <DialogActions>
      <Button onClick={onClose} color="primary">
        No
      </Button>
      <Button
        onClick={() => {
          onClose();
          onConfirm();
        }}
        color="primary"
        autoFocus
      >
        Yes, take me there
      </Button>
    </DialogActions>
  </Dialog>
);

ReceiveInviteDialog.propTypes = {
  invitation: PropTypes.shape({
    user: PropTypes.shape({
      name: PropTypes.string
    }),
    room: PropTypes.shape({
      name: PropTypes.string
    })
  }),
  open: PropTypes.bool,
  onClose: PropTypes.func,
  onConfirm: PropTypes.func
};

ReceiveInviteDialog.defaultProps = {
  invitation: {},
  open: false,
  onClose: undefined,
  onConfirm: undefined
};

export default ReceiveInviteDialog;
