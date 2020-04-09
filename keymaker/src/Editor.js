import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";

import GroupPanel from "./GroupPanel";
import TextField from "./TextField";
import ArrayField from "./ArrayField";
import RoomTable from "./RoomTable";

const useStyles = makeStyles((theme) => ({
  room: {
    backgroundColor: theme.palette.background.default,
  },
}));

const Editor = ({ model, onChange, onRoomDialogOpen, onRoomDelete }) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <GroupPanel title="Google Authentication">
        <TextField
          label="Client ID"
          field="GOOGLE_CLIENT_ID"
          onChange={onChange}
          model={model}
        />
        <TextField
          label="Secret key"
          field="GOOGLE_SECRET"
          onChange={onChange}
          model={model}
        />
        <TextField
          label="Callback URL"
          field="GOOGLE_CALLBACK_URL"
          onChange={onChange}
          model={model}
        />
        <ArrayField
          label="Whitelist domains"
          field="WHITELIST_DOMAINS"
          helperText="Example: @matrix.com;@zion.com;@gmail.com"
          onChange={onChange}
          model={model}
        />
      </GroupPanel>
      <GroupPanel title="System">
        <TextField
          label="Environment"
          field="ENVIRONMENT"
          onChange={onChange}
          model={model}
        />
        <TextField
          label="Host"
          field="HOST"
          onChange={onChange}
          model={model}
        />
        <TextField
          label="Port"
          field="PORT"
          onChange={onChange}
          model={model}
        />
        <TextField
          label="Cookie session secret"
          field="COOKIE_SESSION_SECRET"
          onChange={onChange}
          model={model}
        />
        <TextField
          label="Cookie session max age"
          field="COOKIE_SESSION_MAX_AGE"
          onChange={onChange}
          model={model}
        />
      </GroupPanel>
      <GroupPanel title="Rooms" className={classes.room}>
        <RoomTable
          rooms={model.ROOMS_DATA}
          onRoomDialogOpen={onRoomDialogOpen}
          onRoomDelete={onRoomDelete}
        />
        {model.errors.ROOMS_DATA && (
          <Box color="error.main">
            <Typography>{model.errors.ROOMS_DATA}</Typography>
          </Box>
        )}
      </GroupPanel>
    </div>
  );
};

export default Editor;
