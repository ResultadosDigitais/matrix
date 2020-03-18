import React from "react";

import styles from "./footer.module.css";

export const Footer = () => (
  <div
    className={`row p-5 justify-content-center align-items-center ${styles.bottomdiv}`}
  >
    <span>
      Made with <span className={styles.heart}>&#9829;</span> by RDoers in a few
      places.
    </span>
  </div>
);
