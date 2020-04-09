import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import MUTextField from "@material-ui/core/TextField";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(1, 0),
  },
  field: {
    width: "100%",
  },
}));

const TextField = ({ field, model, onChange, ...props }) => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <MUTextField
        {...props}
        variant="outlined"
        className={classes.field}
        value={model[field] || ""}
        onChange={(event) => {
          onChange(field, event.target.value);
        }}
      />
    </div>
  );
};

export default TextField;
