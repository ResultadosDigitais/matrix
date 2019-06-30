import React from "react";
import PropTypes from "prop-types";
import IconButton from "@material-ui/core/IconButton";
import ExitToApp from "@material-ui/icons/ExitToApp";

const MenuRoom = ({ history, onExit }) => (
  <IconButton
    aria-label="Exit room"
    aria-controls="menu-appbar"
    onClick={() => {
      onExit();
      history.push("/morpheus");
    }}
    color="inherit"
  >
    <ExitToApp />
  </IconButton>
);

MenuRoom.propTypes = {
  history: PropTypes.object.isRequired,
  onExit: PropTypes.func.isRequired
};

export default MenuRoom;
