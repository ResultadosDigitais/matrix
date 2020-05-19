import React from "react";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(6)
  }
}));

const AdapterLink = React.forwardRef((props, ref) => (
  <Link innerRef={ref} {...props} />
));

const PageNotFound = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Typography variant="h3" gutterBottom>
        404 - Page not found
      </Typography>
      <Button
        component={AdapterLink}
        to="/morpheus"
        variant="outlined"
        color="primary"
        size="large"
      >
        Go to home page
      </Button>
    </div>
  );
};

export default PageNotFound;
