import React from "react";
import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";
import clsx from "clsx";

import styles from "./index.module.css";

const GoogleButton = ({ isDark }) => {
  const { t } = useTranslation();

  return (
    <a
      role="button"
      className={clsx(styles.GoogleButton, { [styles.GoogleButtonDark]: isDark })}
      tabIndex={0}
      href="/auth/google"
    >
      <span className={clsx(styles.GoogleButtonLogo, { [styles.GoogleButtonLogoDark]: isDark })}>
        <img height="25px" width="25px" alt="" src="/images/google-button/logo.svg"/>
      </span>
      <span className={clsx(styles.GoogleButtonText, { [styles.GoogleButtonTextDark]: isDark })}>
        {t("login:google-signin")}
      </span>
    </a>
  );
};

GoogleButton.propTypes = {
  isDark: PropTypes.bool.isRequired
};

export default GoogleButton;
