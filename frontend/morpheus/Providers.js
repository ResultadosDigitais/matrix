import React from "react";
import PropTypes from "prop-types";
import CssBaseline from "@material-ui/core/CssBaseline";
// eslint-disable-next-line import/no-extraneous-dependencies
import { ThemeProvider } from "@material-ui/styles";
import { createMuiTheme } from "@material-ui/core/styles";
import { pink, blue } from "@material-ui/core/colors";
import { Provider as ReduxProvider } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";
import { SnackbarProvider } from "notistack";

const theme = createMuiTheme({
  palette: {
    primary: blue,
    secondary: pink
  }
});

const Providers = ({ store, children }) => (
  <ReduxProvider store={store}>
    <CssBaseline />
    <ThemeProvider theme={theme}>
      <SnackbarProvider
        maxSnack={5}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Router>{children}</Router>
      </SnackbarProvider>
    </ThemeProvider>
  </ReduxProvider>
);

Providers.propTypes = {
  store: PropTypes.object.isRequired,
  children: PropTypes.node.isRequired
};

export default Providers;
