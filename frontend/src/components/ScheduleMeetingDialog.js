import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import InputLabel from '@material-ui/core/InputLabel';
import Divider from '@material-ui/core/Divider';
import { connect } from 'react-redux';
import { selectRooms } from '../morpheus/store/selectors';
import Select from './Select';

const styles = makeStyles(() => ({
  formControl: {
    margin: 0,
    fullWidth: true,
    display: 'flex',
    wrap: 'nowrap'
  },
  select: {
    display: 'flex'
  }
}));

const ScheduleMeetingDialog = ({ open, onClose, onConfirm, title, rooms }) => {
  const classes = styles();
  const [typeRoom, setTypeRoom] = useState('old-room');
  const [roomId, setRoomId] = React.useState('');
  const [roomName, setRoomName] = React.useState('');

  const onRoomTypeChange = event => {
    setTypeRoom(event.target.value);
  };

  const onRoomChange = event => {
    setRoomId(event.target.value);
  };

  const onRoomNameChange = event => {
    setRoomName(event.target.value);
  };

  const formatOption = (id, label, standard = false) => ({
    value: `${id}`,
    label: `${label}`,
    standard
  });

  const getRoomOptions = () =>
    rooms.map((room, index) => formatOption(room.id, room.name, index === 0));

  const canSubmit = () => {
    if(typeRoom === 'new-room' && roomName) return true
    if (typeRoom === 'old-room' && roomId) return true
    return false;
  }
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle id="alert-dialog-title">{title}</DialogTitle>
      <DialogContent>
        <div>
          <FormControl component="fieldset" className={classes.formControl}>
            <FormLabel component="legend">
              What room would you like to use?
            </FormLabel>
            <RadioGroup
              defaultValue="old-room"
              aria-label="room-scope"
              name="room-scope"
              value={typeRoom}
              onChange={onRoomTypeChange}
            >
              <FormControlLabel
                value="old-room"
                control={<Radio />}
                label="Existent room"
              />
              <FormControlLabel
                value="new-room"
                control={<Radio />}
                label="New room"
              />
            </RadioGroup>
          </FormControl>

          <Divider />
          {typeRoom === 'old-room' ? (
            <FormControl className={classes.formControl}>
              <Select
                label="Room"
                options={getRoomOptions()}
                value={roomId}
                onChange={onRoomChange}
                className={classes.select}
              ></Select>
            </FormControl>
          ) : (
            <FormControl className={classes.formControl}>
              <TextField
                value={roomName}
                onChange={onRoomNameChange}
                id="new-room-name"
                label="New Room Name"
                variant="filled"
              />
            </FormControl>
          )}
        </div>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Cancel
        </Button>
        <Button
          onClick={() => {
            if (onConfirm && canSubmit()) {
              onConfirm(typeRoom === 'new-room' ? null : roomId, roomName);
              onClose()
            }
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
  title: PropTypes.string.isRequired,
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onConfirm: PropTypes.func.isRequired
};

ScheduleMeetingDialog.defaultProps = {
  title: '',
  open: false,
  onClose: undefined,
  onConfirm: undefined,
  rooms: []
};

const mapStateToProps = state => ({
  rooms: selectRooms(state)
});

export default connect(mapStateToProps)(ScheduleMeetingDialog);
