import React from "react";
import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";
import { makeStyles } from "@material-ui/core/styles";
import UIDrawer from "@material-ui/core/Drawer";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";

export const drawerWidth = 260;

export const drawerHeader = theme => ({
  display: "flex",
  alignItems: "center",
  padding: "0 8px",
  ...theme.mixins.toolbar,
  justifyContent: "flex-end"
});

const useStyles = makeStyles(theme => ({
  root: {
    width: drawerWidth,
    flexShrink: 0
  },
  drawerPaper: {
    width: drawerWidth
  },
  drawerHeader: drawerHeader(theme)
}));

const Drawer = ({ open, onClose, children }) => {
  const classes = useStyles();

  const { t } = useTranslation();

  return (
    <UIDrawer
      className={classes.root}
      variant="persistent"
      anchor="left"
      open={open}
      classes={{
        paper: classes.drawerPaper
      }}
    >
      <div className={classes.drawerHeader}>
        <IconButton title={t("general:close-menu")} onClick={onClose}>
          <ChevronLeftIcon />
        </IconButton>
      </div>
      <Divider />
      {children}
    </UIDrawer>
  );
};

Drawer.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  children: PropTypes.node
};

Drawer.defaultProps = {
  children: undefined
};

export default Drawer;
