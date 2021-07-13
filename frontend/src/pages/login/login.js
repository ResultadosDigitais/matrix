/* eslint-disable class-methods-use-this */
import React, { useState, useEffect } from "react";
import clsx from "clsx";

import { Footer } from "./footer";
import { Logo } from "./logo";
import { Title } from "./title";

import MatrixProfile from "../../profile";
import { isDarkTheme } from "../../morpheus/Themes";

import "bootstrap/dist/css/bootstrap.css";

import styles from "./login.module.css";
import GoogleButton from "./google-button";

export function Login() {
  const [error, setError] = useState(null);
  const isDark = isDarkTheme();

  useEffect(() => {
    const err = document.getElementById("error").value;
    setError(err);
  });

  const imageName = isDark ? "bg-dark.png" : "bg.png";
  const imageURL = `url(/images/${imageName})`;

  return (
    <div
      className={styles.auth_background}
      style={{ backgroundImage: imageURL }}
    >
      <div className="container-fluid">
        <div className="row h-100">
          <div
            className={clsx("col-auto", "", styles.auth_panel, {
              [styles.auth_panel_dark]: isDark
            })}
          >
            <div className="row h-100 justify-content-center align-items-center">
              <div className="col px-5 text-center">
                <Logo />
                <Title />
                <GoogleButton isDark={isDark} />
                {error && (
                  <p className={clsx("text-danger", styles.error)}>{error}</p>
                )}
              </div>
              <Footer />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
