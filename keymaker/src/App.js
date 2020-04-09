import React, { useReducer } from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import { makeStyles } from "@material-ui/core/styles";

import { reducer, initialState, actions } from "./App.reducer";
import Editor from "./Editor";
import Preview from "./Preview";
import RoomDialog from "./RoomDialog";

const useStyles = makeStyles((theme) => ({
  root: {
    height: "100vh",
  },
}));

const App = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const classes = useStyles();

  const { model, config, roomDialog } = state;

  return (
    <>
      <CssBaseline />
      <Grid container component="main" className={classes.root}>
        <Grid item xs={12} sm={6} component={Paper} elevation={6} square>
          <Editor
            onChange={(field, value) => {
              dispatch({ type: actions.changeModel, field, value });
            }}
            onRoomDialogOpen={(id) => {
              dispatch({ type: actions.openRoomDialog, id });
            }}
            onRoomDelete={(id) => {
              dispatch({ type: actions.deleteRoom, id });
            }}
            model={model}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <Preview
            onChange={(config) => {
              dispatch({ type: actions.changeConfig, config });
            }}
            config={config}
          />
        </Grid>
      </Grid>
      <RoomDialog
        open={roomDialog.open}
        room={roomDialog.room}
        onChangeRoom={(key, value) => {
          dispatch({ type: actions.changeRoomInDialog, key, value });
        }}
        onClose={() => {
          dispatch({ type: actions.closeRoomDialog });
        }}
        onSubmit={(room) => {
          dispatch({ type: actions.submitRoomDialog, room });
        }}
      />
    </>
  );
};

export default App;
