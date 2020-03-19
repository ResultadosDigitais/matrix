/* eslint-disable class-methods-use-this */
import React, { Component } from "react";
import clsx from "clsx";

import { Footer } from "./footer";
import { LoginButton } from "./login-button";
import { Logo } from "./logo";
import { Title } from "./title";

import MatrixProfile from "../../profile";
import { isDarkTheme } from "../../morpheus/Themes";

import "bootstrap/dist/css/bootstrap.css";

import styles from "./login.module.css";

export class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isDark: isDarkTheme()
    };

    this.matrixProfile = new MatrixProfile();
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

  render() {
    const { isDark } = this.state;
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
                <div className="col px-5">
                  <Logo />
                  <Title />
                  <LoginButton onSignIn={profile => this.onSignIn(profile)} />
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
