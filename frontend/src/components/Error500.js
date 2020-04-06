import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import Fab from "@material-ui/core/Fab";

const useStyles = makeStyles(() => ({
  root: {
    height: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat"
  },
  box: {
    textAlign: "center"
  },
  imgTitle: {
    width: 360,
    marginBottom: 30
  }
}));

const Error500 = ({ onReload }) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <div className={classes.box}>
        <Fab
          variant="extended"
          color="secondary"
          aria-label="Reload"
          onClick={onReload}
        >
          Atualizar a página
        </Fab>
      </div>
    </div>
  );
};

Error500.propTypes = {
  onReload: PropTypes.func
};

Error500.defaultProps = {
  onReload: () => {}
};

export default Error500;
