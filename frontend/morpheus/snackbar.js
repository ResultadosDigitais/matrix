import React from "react";
import Button from "@material-ui/core/Button";

export const buildDefaultAction = onClose => key => (
  <Button
    color="primary"
    onClick={() => {
      onClose(key);
    }}
  >
    Dismiss
  </Button>
);
