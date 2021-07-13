import React from "react";
import PropTypes from "prop-types";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(() => ({
  title: {
    flexGrow: 1,
    display: "flex",
    alignItems: "center",
  }
}));

const AppBarTitle = ({ children }) => {
  const classes = useStyles();

  return (
    <Typography variant="h6" className={classes.title} color="secondary">
      {children}
    </Typography>
  );
};

AppBarTitle.propTypes = {
  children: PropTypes.node
};

AppBarTitle.defaultProps = {
  children: undefined
};

export default AppBarTitle;
