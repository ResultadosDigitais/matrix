import React from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";

const RoomDialog = ({ onClose, onSubmit, open, room, onChangeRoom }) => (
  <Dialog open={open} onClose={onClose} aria-labelledby="room-dialog">
    <DialogTitle id="room-dialog">
      {room.id ? "Edit Room" : "New Room"}
    </DialogTitle>
    <DialogContent>
      <TextField
        autoFocus
        margin="dense"
        label="Name"
        value={room.name || ""}
        onChange={(event) => {
          onChangeRoom("name", event.target.value);
        }}
        fullWidth
      />
      <FormControlLabel
        control={
          <Checkbox
            checked={!!room.disableMeeting}
            onChange={(event) => {
              onChangeRoom("disableMeeting", event.target.checked);
            }}
            color="primary"
          />
        }
        label="Disable meeting"
      />
      <TextField
        margin="dense"
        label="External Meet URL"
        type="url"
        disabled={room.disableMeeting}
        value={room.externalMeetUrl || ""}
        onChange={(event) => {
          onChangeRoom("externalMeetUrl", event.target.value);
        }}
        fullWidth
      />
    </DialogContent>
    <DialogActions>
      <Button onClick={onClose} color="primary">
        Cancel
      </Button>
      <Button onClick={onSubmit} color="primary">
        Save
      </Button>
    </DialogActions>
  </Dialog>
);

export default RoomDialog;
