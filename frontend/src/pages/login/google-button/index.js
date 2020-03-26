import React from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import { GoogleLogo } from "./logo"

import styles from "./index.module.css";

const GoogleButton = ({ isDark, onClick }) => (
  <div
    role="button"
    aria-label="Entrar com google"
    className={clsx(styles.GoogleButton, { [styles.GoogleButton]: isDark })}
    tabIndex={0}
    onClick={onClick}
    onKeyPress={event => {
      if (event.key === "Enter") {
        onClick();
      }
    }}
    >
    <GoogleLogo />
    <p>Entrar com google</p>
  </div>
);

GoogleButton.propTypes = {
  onClick: PropTypes.func.isRequired,
  isDark: PropTypes.bool.isRequired,
};

export default GoogleButton;
