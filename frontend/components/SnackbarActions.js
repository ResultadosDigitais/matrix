import React from "react";
import PropTypes from "prop-types";
import Button from "@material-ui/core/Button";

const SnackbarActions = ({ onDismiss }) => (
  <Button color="primary" onClick={onDismiss}>
    Dismiss
  </Button>
);

SnackbarActions.propTypes = {
  onDismiss: PropTypes.func
};

SnackbarActions.defaultProps = {
  onDismiss: () => {}
};

export default SnackbarActions;
