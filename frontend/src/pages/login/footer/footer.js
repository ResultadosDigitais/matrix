import React from "react";
import { Trans } from "react-i18next";

import styles from "./footer.module.css";

export const Footer = () => (
    <div
      className={`row p-5 justify-content-center align-items-center ${styles.bottomdiv}`}
    >
    <Trans
      i18nKey="login:footer"
      components={{ heart: <span className={styles.heart} /> }}
    />
  </div>
);
