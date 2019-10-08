import React, { useState } from "react";
import PropTypes from "prop-types";
import clsx from "clsx";

import { CssBaseline } from "@material-ui/core";
import { MuiThemeProvider, makeStyles, createMuiTheme } from "@material-ui/core/styles";


import AppBar from "./AppBar";
import Drawer, { drawerWidth, drawerHeader } from "./Drawer";

const theme = createMuiTheme({
  palette: {
    type: 'dark'
  }
})

const useStyles = makeStyles(theme => (
  return {
  root: {
    display: "flex",
    backgroundColor: "#e1f5fe",
    minHeight: "100vh"
  },
  main: {
    display: "flex",
    flexDirection: "column",
    flexGrow: 1,
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    }),
    marginLeft: -drawerWidth
  },
  mainShift: {
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen
    }),
    marginLeft: 0
  },
  drawerHeader: drawerHeader(theme),
  container: {
    flex: 1
  }
}));

const PageLayout = ({
  title,
  renderAppBarMenu,
  renderSideBarMenu,
  children
}) => {
  const [isDrawerOpen, toggleDrawer] = useState();
  const classes = useStyles();

  return (
        <MuiThemeProvider theme={theme}>
        <CssBaseline />
    <div className={classes.root}>
      <AppBar
        isDrawerOpen={isDrawerOpen}
        title={title}
        openDrawer={() => {
          toggleDrawer(true);
        }}
      >
        {renderAppBarMenu()}
      </AppBar>
      <Drawer
        open={isDrawerOpen}
        onClose={() => {
          toggleDrawer(false);
        }}
      >
        {renderSideBarMenu()}
      </Drawer>
      <main
        className={clsx(classes.main, {
          [classes.mainShift]: isDrawerOpen
        })}
      >
        <div className={classes.drawerHeader} />
        <div className={classes.container}>{children}</div>
      </main>
    </div>
  </MuiThemeProvider>
  );
};

PageLayout.propTypes = {
  title: PropTypes.string,
  renderSideBarMenu: PropTypes.func,
  renderAppBarMenu: PropTypes.func,
  children: PropTypes.node
};

PageLayout.defaultProps = {
  title: "",
  renderSideBarMenu: () => {},
  renderAppBarMenu: () => {},
  children: undefined
};

export default PageLayout;
