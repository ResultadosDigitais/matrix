/* global gapi */

import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";
import CssBaseline from "@material-ui/core/CssBaseline";
// eslint-disable-next-line import/no-extraneous-dependencies
import { ThemeProvider } from "@material-ui/styles";
import { createMuiTheme } from "@material-ui/core/styles";
import { pink } from "@material-ui/core/colors";

import MorpheusApp from "./morpheus/MorpheusApp";

const theme = createMuiTheme({
  palette: {
    primary: pink
  }
});

ReactDOM.render(
  <>
    <CssBaseline />
    <ThemeProvider theme={theme}>
      <Router>
        <MorpheusApp />
      </Router>
    </ThemeProvider>
  </>,
  document.getElementById("root")
);

window.onload = () => {
  gapi.load("auth2", () => {
    gapi.auth2.init();
  });
};
