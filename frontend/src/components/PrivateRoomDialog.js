import React from "react";
import PropTypes from "prop-types";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import TextField from '@material-ui/core/TextField';

const PrivateRoomDialog = ({ open, onClose }) => (
 <Dialog open={open} onClose={onClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Private room</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Please introduce the password to join
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Password"
            type="password"
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose} color="primary">
            Cancel
          </Button>
          <Button onClick={onClose} color="primary">
          Enter meeting
          </Button>
        </DialogActions>
      </Dialog>

);

PrivateRoomDialog.propTypes = {
  open: PropTypes.bool,
  onClose: PropTypes.func,
};

PrivateRoomDialog.defaultProps = {
  open: false,
  onClose: undefined,
};

export default PrivateRoomDialog;