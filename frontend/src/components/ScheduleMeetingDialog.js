import React, { useState } from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import InputBase from "@material-ui/core/InputBase";
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
import Tooltip from "@material-ui/core/Tooltip";
import TextField from '@material-ui/core/TextField';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import Divider from "@material-ui/core/Divider";
import { connect } from "react-redux";
import {
  selectRooms
} from "../morpheus/store/selectors";

const styles = makeStyles(() => ({
  formControl: {
    margin: 0,
    fullWidth: true,
    display: "flex",
    wrap: "nowrap"
  },
  select: {
    display: "flex"
  }
}));

const ScheduleMeetingDialog = ({ open, onClose, onConfirm, title, rooms }) => {
  const classes = styles();
  const [typeRoom, setTypeRoom] = useState('old-room');
  const [roomId, setRoomId] = React.useState('');

  const onRoomTypeChange = event => {
    setTypeRoom(event.target.value);
  };

  const onRoomChange = event => {
    setRoomId(event.target.value);
  };
  

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle id="alert-dialog-title">{title}</DialogTitle>
      <DialogContent>
        <div>
            <FormControl component="fieldset"  className={classes.formControl}>
              <FormLabel component="legend">What room would you like to use?</FormLabel>
              <RadioGroup defaultValue="old-room" aria-label="room-scope" name="room-scope" value={typeRoom} onChange={onRoomTypeChange}>
                <FormControlLabel value="old-room" control={<Radio/>} label="Existent room" />
                <FormControlLabel value="new-room" control={<Radio/>} label="New room" />
              </RadioGroup>
            </FormControl>
            
            <Divider />
            { typeRoom === 'old-room' ? <FormControl  className={classes.formControl}>
              <InputLabel id="demo-simple-select-label">Room</InputLabel>
              
              <Select
              value={roomId}
              className={classes.select}
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              onChange={onRoomChange}
            >
              {rooms && rooms.map(room => (
                <MenuItem value={room.id}>{room.name}</MenuItem>
              ))}
            </Select>
            </FormControl> : <FormControl  className={classes.formControl}>
              <TextField id="filled-basic" label="New Room Name" variant="filled" />
            </FormControl>}
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
          Schedule
        </Button>
      </DialogActions>
    </Dialog>
  );
};

ScheduleMeetingDialog.propTypes = {
  title: PropTypes.string,
  open: PropTypes.bool,
  onClose: PropTypes.func,
  onConfirm: PropTypes.func
};

ScheduleMeetingDialog.defaultProps = {
  title: "",
  open: false,
  onClose: undefined,
  onConfirm: undefined,
  rooms: [],
};

const mapStateToProps = state => ({
  rooms: selectRooms(state)
});

export default connect(
  mapStateToProps
)(ScheduleMeetingDialog);