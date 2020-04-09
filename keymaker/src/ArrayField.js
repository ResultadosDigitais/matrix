import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(1, 0),
  },
  field: {
    width: "100%",
  },
}));

const ArrayField = ({ field, model, onChange, ...props }) => {
  const classes = useStyles();

  const arr = model[field] || [];
  const value = arr.join(";");

  return (
    <div className={classes.root}>
      <TextField
        {...props}
        variant="outlined"
        className={classes.field}
        value={value}
        onChange={(event) => {
          const newValue = event.target.value
            ? event.target.value
                .trim()
                .split(";")
                .map((s) => s.trim())
            : [];
          onChange(field, newValue);
        }}
      />
    </div>
  );
};

export default ArrayField;
