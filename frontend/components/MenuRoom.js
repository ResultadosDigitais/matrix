import React from "react";
import PropTypes from "prop-types";
import IconButton from "@material-ui/core/IconButton";
import ExitToApp from "@material-ui/icons/ExitToApp";

const MenuRoom = ({ onExitRoom }) => (
  <IconButton
    aria-label="Exit room"
    aria-controls="menu-appbar"
    onClick={onExitRoom}
    color="inherit"
  >
    <ExitToApp />
  </IconButton>
);

MenuRoom.propTypes = {
  onExitRoom: PropTypes.func.isRequired
};

export default MenuRoom;
