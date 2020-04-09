import React, { useReducer } from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import { makeStyles } from "@material-ui/core/styles";

import { reducer, initialState } from "./App.reducer";
import Editor from "./Editor";
import Preview from "./Preview";

const useStyles = makeStyles((theme) => ({
  root: {
    height: "100vh",
  },
}));

const App = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const classes = useStyles();

  const { model, config } = state;

  return (
    <>
      <CssBaseline />
      <Grid container component="main" className={classes.root}>
        <Grid item xs={12} sm={6} component={Paper} elevation={6} square>
          <Editor
            onChange={(field, value) => {
              dispatch({ type: "change-model", field, value });
            }}
            model={model}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <Preview
            onChange={(config) => {
              dispatch({ type: "change-config", config });
            }}
            config={config}
          />
        </Grid>
      </Grid>
    </>
  );
};

export default App;
