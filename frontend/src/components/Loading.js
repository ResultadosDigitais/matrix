import React from "react";
import { useTranslation } from "react-i18next";
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

  const { t } = useTranslation();

  return (
    <div className={classes.root}>
      <CircularProgress className={classes.progress} />
      <Typography variant="h5" color="primary">
        {t("general:loading")}...
      </Typography>
    </div>
  );
};

export default Loading;
