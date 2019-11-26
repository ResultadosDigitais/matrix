import React, { Component } from "react";
import { render } from "react-dom";

import { Footer } from "./footer";
import { LoginButton } from "./login-button";
import { Logo } from "./logo";
import { Title } from "./title";

import MatrixProfile from "../../profile";

import "bootstrap/dist/css/bootstrap.css";
import "./global.css";

import styles from "./login.module.css";

export class Login extends Component {
  constructor(props) {
    super(props);

    this.matrixProfile = new MatrixProfile();
  }

  goToOffice() {
    window.location.href = "./morpheus";
  }

  onSignIn(profile) {
    this.matrixProfile.storeProfileData(profile);
    this.goToOffice();
  }

  render() {
    return (
      <div className="container-fluid">
        <div className="row h-100">
          <div className={`col-md-3 ${styles.login_panel}`}>
            <div className="row h-100 justify-content-center align-items-center">
              <div className="col">
                <Logo />
                <Title />
                <LoginButton onSignIn={profile => this.onSignIn(profile)} />
              </div>

              <Footer />
            </div>
          </div>
        </div>
      </div>
    );
  }
}
