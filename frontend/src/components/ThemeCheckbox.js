import React from "react";
import PropTypes from "prop-types";

import IconButton from "@material-ui/core/IconButton";
import EmojiObjectsIcon from "@material-ui/icons/EmojiObjects";
import Tooltip from "@material-ui/core/Tooltip";

function ThemeCheckbox({ onChange }) {
  return (
    <Tooltip title="Toggle light/dark theme">
      <IconButton
        aria-label="Exit room"
        aria-controls="menu-appbar"
        onClick={onChange}
        color="inherit"
      >
        <EmojiObjectsIcon />
      </IconButton>
    </Tooltip>
  );
}

ThemeCheckbox.propTypes = {
  onChange: PropTypes.func.isRequired
};

export default ThemeCheckbox;
