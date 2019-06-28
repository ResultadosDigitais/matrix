/* global gapi */

import React from "react";
import ReactDOM from "react-dom";
import CssBaseline from "@material-ui/core/CssBaseline";
// eslint-disable-next-line import/no-extraneous-dependencies
import { ThemeProvider } from "@material-ui/styles";
import { createMuiTheme } from "@material-ui/core/styles";
import { pink } from "@material-ui/core/colors";

import MorpheusPage from "./pages/morpheus";

const theme = createMuiTheme({
  palette: {
    primary: pink
  }
});

ReactDOM.render(
  <>
    <CssBaseline />
    <ThemeProvider theme={theme}>
      <MorpheusPage />
    </ThemeProvider>
  </>,
  document.getElementById("root")
);

window.onload = () => {
  gapi.load("auth2", () => {
    gapi.auth2.init();
  });
};
