import React, { useState } from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";

import Grid from "../components/Grid";
import RoomCard from "../components/RoomCard";
import EnterMeetingDialog from "../components/EnterMeetingDialog";

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(3)
  }
}));

const MorpheusOffice = ({ office, history, onUserEnterRoom }) => {
  const [selectedRoom, setSelectedRoom] = useState({});
  const [isMeetingDialogOpen, setMeetingDialogOpen] = useState(false);
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Grid>
        {office.map(room => (
          <RoomCard
            {...room}
            key={room.id}
            onClick={() => {
              setSelectedRoom(room);
              setMeetingDialogOpen(true);
            }}
          />
        ))}
      </Grid>
      <EnterMeetingDialog
        title={selectedRoom.name}
        open={isMeetingDialogOpen}
        onClose={() => {
          setMeetingDialogOpen(false);
        }}
        onConfirm={config => {
          onUserEnterRoom(selectedRoom);
          history.push("/morpheus/office", {
            config,
            room: selectedRoom
          });
        }}
      />
    </div>
  );
};

MorpheusOffice.propTypes = {
  office: PropTypes.arrayOf(PropTypes.object),
  history: PropTypes.object,
  onUserEnterRoom: PropTypes.func
};

MorpheusOffice.defaultProps = {
  office: [],
  history: undefined,
  onUserEnterRoom: () => {}
};

export default MorpheusOffice;
