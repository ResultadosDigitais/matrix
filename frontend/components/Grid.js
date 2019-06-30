import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(() => ({
  root: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
    gridGap: 20
  }
}));

const Grid = ({ children }) => {
  const classes = useStyles();

  return <div className={classes.root}>{children}</div>;
};

Grid.propTypes = {
  children: PropTypes.node.isRequired
};

export default Grid;
