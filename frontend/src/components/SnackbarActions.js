import React from "react";
import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";
import Button from "@material-ui/core/Button";

const SnackbarActions = ({ onDismiss }) => {
  const { t } = useTranslation();

  return (
    <Button color="primary" onClick={onDismiss}>
      {t("general:dismiss")}
    </Button>
  );
};

SnackbarActions.propTypes = {
  onDismiss: PropTypes.func
};

SnackbarActions.defaultProps = {
  onDismiss: () => {}
};

export default SnackbarActions;
