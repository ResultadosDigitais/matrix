import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";

import GroupPanel from "./GroupPanel";
import TextField from "./TextField";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.paper,
  },
}));

const Editor = ({ model, onChange }) => {
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
      </GroupPanel>
      <GroupPanel title="Salas">
        <TextField
          label="Client ID"
          field="GOOGLE_CLIENT_ID"
          onChange={onChange}
          model={model}
        />
      </GroupPanel>
      <GroupPanel title="Salas">
        <List>
          <ListItem>
            <ListItemText primary="Single-line item" />
          </ListItem>
        </List>
      </GroupPanel>
    </div>
  );
};

export default Editor;
