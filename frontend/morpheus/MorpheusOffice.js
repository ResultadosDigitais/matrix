import React, { useState } from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";

import Grid from "../components/Grid";
import Room from "../components/Room";
import EnterMeetingDialog from "../components/EnterMeetingDialog";

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(3)
  }
}));

const MorpheusOffice = ({ office, history }) => {
  const [selectedRoom, setSelectedRoom] = useState({});
  const [isMeetingDialogOpen, setMeetingDialogOpen] = useState(false);
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Grid>
        {office.map(room => (
          <Room
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
  history: PropTypes.object
};

MorpheusOffice.defaultProps = {
  office: [],
  history: undefined
};

export default MorpheusOffice;
