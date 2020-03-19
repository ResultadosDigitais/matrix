import React from "react";
import PropTypes from "prop-types";
import clsx from "clsx";

import styles from "./index.module.css";

const GoogleButton = ({ isDark, onClick }) => (
  <div
    role="button"
    aria-label="Sign in with Google"
    className={clsx(styles.GoogleButton, { [styles.GoogleButtonDark]: isDark })}
    tabIndex={0}
    onClick={onClick}
    onKeyPress={event => {
      if (event.key === "Enter") {
        onClick();
      }
    }}
  />
);

GoogleButton.propTypes = {
  onClick: PropTypes.func.isRequired,
  isDark: PropTypes.bool.isRequired,
};

export default GoogleButton;
