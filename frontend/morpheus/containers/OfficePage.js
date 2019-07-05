import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";

import Grid from "../../components/Grid";
import RoomCard from "../../components/RoomCard";
import { selectOffice } from "../store/selectors";
import { emitEnterInRoom } from "../socket";
import { setCurrentRoom } from "../store/actions";

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(3)
  }
}));

const OfficePage = ({ onSetCurrentRoom, office, history }) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Grid>
        {office.map(room => (
          <RoomCard
            {...room}
            key={room.id}
            onEnterRoom={() => {
              emitEnterInRoom(room.id);
              onSetCurrentRoom(room);
            }}
            onEnterMeeting={() => {
              history.push(`/morpheus/room/${room.id}`);
            }}
          />
        ))}
      </Grid>
    </div>
  );
};

OfficePage.propTypes = {
  onSetCurrentRoom: PropTypes.func,
  office: PropTypes.arrayOf(PropTypes.object),
  history: PropTypes.object
};

OfficePage.defaultProps = {
  onSetCurrentRoom: () => {},
  office: [],
  history: undefined
};

const mapStateToProps = state => ({
  office: selectOffice(state)
});

const mapDispatchToProps = {
  onSetCurrentRoom: setCurrentRoom
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(OfficePage);
