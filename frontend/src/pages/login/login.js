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

import axios from "axios";

export class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isDark: isDarkTheme(),
      error: null
    };

    this.matrixProfile = new MatrixProfile();
  }

  onSignIn(profile) {
    var that = this;

     axios
      .get(`/checkemail?email=${profile.email}`)
      .then(response => {
        let validateResponse = response.data;

        if(validateResponse.valid){
          that.matrixProfile.storeProfileData(profile);
          that.goToOffice();
        }else{
          that.setState({ error: "Invalid email for this office." });
          return;
        }

      })
      .catch(error => {
        that.setState({ error: "Error on validate email!" });
        console.log(error)
      });
  }

  getBackgroundImage(isDark) {
    const imageName = isDark ? "bg-dark.png" : "bg.png";
    return `url(/images/${imageName})`;
  }

  goToOffice() {
    window.location.href = "./morpheus";
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
                <div className="col px-5">
                  <Logo />
                  <Title />
                  <LoginButton onSignIn={profile => this.onSignIn(profile)} />
                  {error && <p className="text-danger">{error}</p>}
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
