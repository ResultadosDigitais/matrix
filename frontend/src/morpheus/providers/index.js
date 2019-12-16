import React from "react";
import PropTypes from "prop-types";
import { Provider as ReduxProvider } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";
import { SnackbarProvider } from "notistack";

import ThemeProvider from "./ThemeProvider";

const Providers = ({ store, children }) => (
  <ReduxProvider store={store}>
    <ThemeProvider>
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
  store: PropTypes.shape({
    subscribe: PropTypes.func.isRequired,
    dispatch: PropTypes.func.isRequired,
    getState: PropTypes.func.isRequired
  }).isRequired,
  children: PropTypes.node.isRequired
};

export default Providers;
