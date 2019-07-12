import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";

import Loading from "../../components/Loading";
import { selectRooms, selectCurrentRoom } from "../store/selectors";
import { CurrentRoomPropType } from "../store/models";

const OfficeRedirect = ({ rooms, currentRoom }) => {
  const [roomId, setRoomId] = useState(null);

  useEffect(() => {
    if (currentRoom && currentRoom.id) {
      setRoomId(currentRoom.id);
    } else if (rooms.length > 0) {
      setRoomId(rooms[0].id);
    }
  }, [currentRoom, rooms]);

  if (roomId) {
    return <Redirect to={`/morpheus/office/${roomId}`} />;
  }

  return <Loading />;
};

OfficeRedirect.propTypes = {
  rooms: PropTypes.arrayOf(PropTypes.object),
  currentRoom: CurrentRoomPropType
};

OfficeRedirect.defaultProps = {
  rooms: [],
  currentRoom: {}
};

const mapStateToProps = state => ({
  rooms: selectRooms(state),
  currentRoom: selectCurrentRoom(state)
});

export default connect(mapStateToProps)(OfficeRedirect);
