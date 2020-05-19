/* global gapi */

import React from "react";
import ReactDOM from "react-dom";

import Providers from "./morpheus/providers";
import store from "./morpheus/store";
import App from "./morpheus/App";
import MatrixProfile from "./profile";

function renderApp() {
  ReactDOM.render(
    <Providers store={store}>
      <App />
    </Providers>,
    document.getElementById("root")
  );
}

window.onload = () => {
  const userString = document.getElementById("user").value;
  const matrixProfile = new MatrixProfile();
  const user = JSON.parse(userString);

  matrixProfile.storeProfileData(user);

  renderApp();
};
