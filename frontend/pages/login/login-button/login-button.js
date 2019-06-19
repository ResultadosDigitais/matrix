import React, { Component } from "react";
import PropTypes from "prop-types";

import styles from "./login-button.module.css";

export class LoginButton extends Component {
  constructor(props) {
    super(props);

    this.buttonContainerRef = React.createRef();
  }

  onSignIn(googleUser) {
    const profile = googleUser.getBasicProfile();

    const profileData = {
      id: profile.getId(),
      name: profile.getName(),
      imageUrl: profile.getImageUrl(),
      email: profile.getEmail()
    };

    this.props.onSignIn(profileData);
  }

  componentDidMount() {
    const buttonContainer = this.buttonContainerRef.current;
    const gapi = window.gapi;

    gapi.signin2.render(buttonContainer, {
      width: "220",
      height: "50",
      longtitle: true,
      theme: "light",
      onsuccess: googleUser => this.onSignIn(googleUser)
    });
  }

  render() {
    return (
      <div className="row justify-content-center align-items-center p-3">
        <div ref={this.buttonContainerRef} className={styles.gButton} />
      </div>
    );
  }
}

LoginButton.propTypes = {
  onSignIn: PropTypes.func.isRequired
};
