import React from "react";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
import IconButton from "@material-ui/core/IconButton";
import ExitToApp from "@material-ui/icons/ExitToApp";

const MenuRoom = ({ history }) => (
  <IconButton
    aria-label="Exit room"
    aria-controls="menu-appbar"
    onClick={() => {
      history.push("/morpheus");
    }}
    color="inherit"
  >
    <ExitToApp />
  </IconButton>
);

MenuRoom.propTypes = {
  history: PropTypes.object.isRequired
};

export default withRouter(MenuRoom);
