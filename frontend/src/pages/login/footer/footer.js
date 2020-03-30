import React from "react";
import { SmallLogo } from "./logo";
import styles from "./footer.module.css";

export const Footer = () => (
  <div
    className={`row p-5 justify-content-center align-items-center ${styles.bottomdiv}`}
  >
    <div className={styles.customFooter}>
      <SmallLogo />
      <p>
      © 2019 - Blox - Sistema Gamificado de Educação por Competências. Todos os Direitos Reservados. Marca Registrada.
      </p>
    </div>
  </div>
);
