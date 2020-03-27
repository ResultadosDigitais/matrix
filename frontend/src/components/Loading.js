import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import CircularProgress from "@material-ui/core/CircularProgress";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "30px 0"
  },
  progress: {
    margin: theme.spacing(2)
  }
}));

const Loading = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <CircularProgress className={classes.progress} />
      <Typography variant="h5" color="primary">
        Carregando...
      </Typography>
    </div>
  );
};

export default Loading;
