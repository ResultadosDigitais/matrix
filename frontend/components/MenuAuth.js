import React from "react";
import PropTypes from "prop-types";
import Button from "@material-ui/core/Button";

const MenuAuth = ({ userName }) => <Button color="inherit">{userName}</Button>;

MenuAuth.propTypes = {
  userName: PropTypes.string.isRequired
};

export default MenuAuth;
