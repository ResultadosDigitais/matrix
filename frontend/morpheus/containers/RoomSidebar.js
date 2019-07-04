import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import AppBarTitle from "../../components/AppBarTitle";
import MenuRoom from "../../components/MenuRoom";
import { selectRooms } from "../store/selectors";

const RoomSidebar = ({ history, match, rooms }) => {
  const { roomId } = match.params;
  const findRoomResult = rooms.find(r => r.id === roomId);
  const currentRoomName = findRoomResult ? findRoomResult.name : "";

  return (
    <>
      <AppBarTitle>{currentRoomName}</AppBarTitle>
      <MenuRoom
        onExitRoom={() => {
          history.push("/morpheus");
        }}
      />
    </>
  );
};

RoomSidebar.propTypes = {
  history: PropTypes.object.isRequired,
  match: PropTypes.object.isRequired,
  rooms: PropTypes.array
};

RoomSidebar.defaultProps = {
  rooms: []
};

const mapStateToProps = state => ({
  rooms: selectRooms(state)
});

export default connect(mapStateToProps)(RoomSidebar);
