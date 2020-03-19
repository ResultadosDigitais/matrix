/* eslint-disable class-methods-use-this */
import React, { Component } from "react";
import clsx from "clsx";

import { Footer } from "./footer";
import { Logo } from "./logo";
import { Title } from "./title";

import MatrixProfile from "../../profile";
import { isDarkTheme } from "../../morpheus/Themes";

import "bootstrap/dist/css/bootstrap.css";

import styles from "./login.module.css";
import GoogleButton from "./google-button";

export class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isDark: isDarkTheme(),
      error: null,
    };

    this.matrixProfile = new MatrixProfile();
  }

  componentDidMount() {
    const error = document.getElementById("error").value;
    const isAuthenticated = document.getElementById("isAuthenticated").value;

    if (error) {
      this.setState({ error });
    }

    if (isAuthenticated === "true") {
      this.goToOffice();
    }
  }

  onSignIn(profile) {
    this.matrixProfile.storeProfileData(profile);
    this.goToOffice();
  }

  getBackgroundImage(isDark) {
    const imageName = isDark ? "bg-dark.png" : "bg.png";
    return `url(/images/${imageName})`;
  }

  goToOffice() {
    window.location.href = "./morpheus";
  }

  goToGoogleAuth() {
    window.location.href = "./auth/google";
  }

  render() {
    const { isDark, error } = this.state;
    return (
      <div
        className={styles.auth_background}
        style={{ backgroundImage: this.getBackgroundImage(isDark) }}
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
                  <GoogleButton
                    isDark={isDark}
                    onClick={() => {
                      this.goToGoogleAuth();
                    }}
                  />
                  {error && (
                    <p className={clsx("text-danger", styles.error)}>
                      {error}
                    </p>
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
}
