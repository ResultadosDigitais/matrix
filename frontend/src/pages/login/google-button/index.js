import React from "react";
import PropTypes from "prop-types";
import clsx from "clsx";

import styles from "./index.module.css";

const GoogleButton = ({ isDark }) => (
  <a
    role="button"
    aria-label="Sign in with Google"
    className={clsx(styles.GoogleButton, { [styles.GoogleButtonDark]: isDark })}
    tabIndex={0}
    href="/auth/google"
  >
    Sign in with Google
  </a>
);

GoogleButton.propTypes = {
  isDark: PropTypes.bool.isRequired
};

export default GoogleButton;
