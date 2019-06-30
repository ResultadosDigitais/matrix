/* global gapi */

import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";
import CssBaseline from "@material-ui/core/CssBaseline";
// eslint-disable-next-line import/no-extraneous-dependencies
import { ThemeProvider } from "@material-ui/styles";
import { createMuiTheme } from "@material-ui/core/styles";
import { pink, blue } from "@material-ui/core/colors";
import { SnackbarProvider } from "notistack";

import MorpheusApp from "./morpheus/MorpheusApp";

const theme = createMuiTheme({
  palette: {
    primary: blue,
    secondary: pink
  }
});

ReactDOM.render(
  <>
    <CssBaseline />
    <ThemeProvider theme={theme}>
      <SnackbarProvider
        maxSnack={5}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Router>
          <MorpheusApp />
        </Router>
      </SnackbarProvider>
    </ThemeProvider>
  </>,
  document.getElementById("root")
);

window.onload = () => {
  gapi.load("auth2", () => {
    gapi.auth2.init();
  });
};
