import React, { useState } from "react";
import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Divider from "@material-ui/core/Divider";

import BaseMeetingSettings from "./MeetingSettings/BaseMeetingSettings";
import AdvancedMeetingPanel from "./MeetingSettings/AdvancedMeetingPanel";
import AdvancedMeetingSettings from "./MeetingSettings/AdvancedMeetingSettings";

const useStyles = makeStyles(() => ({
  content: {
    minHeight: 110 // to avoid generating scrollbar
  }
}));

const EnterMeetingDialog = ({ open, onClose, onConfirm, title }) => {
  const [micEnabled, setMicEnabled] = useState(true);
  const [videoEnabled, setVideoEnabled] = useState(true);
  const classes = useStyles();

  const { t } = useTranslation();

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle id="alert-dialog-title">{title}</DialogTitle>
      <Divider />
      <DialogContent className={classes.content}>
        <DialogContentText id="alert-dialog-description">
          {t("meeting:enter-meeting-with")}
        </DialogContentText>
        <Grid justify="center" spacing={3} container>
          <BaseMeetingSettings
            micEnabled={micEnabled}
            onMicEnabledChange={event => {
              setMicEnabled(event.target.checked);
            }}
            videoEnabled={videoEnabled}
            onVideoEnabledChange={event => {
              setVideoEnabled(event.target.checked);
            }}
          />
        </Grid>
      </DialogContent>
      <AdvancedMeetingPanel>
        <AdvancedMeetingSettings />
      </AdvancedMeetingPanel>
      <Divider />
      <DialogActions>
        <Button onClick={onClose} color="primary">
          {t("general:cancel")}
        </Button>
        <Button onClick={onConfirm} color="primary" autoFocus>
          {t("general:enter")}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

EnterMeetingDialog.propTypes = {
  title: PropTypes.string,
  open: PropTypes.bool,
  onClose: PropTypes.func,
  onConfirm: PropTypes.func
};

EnterMeetingDialog.defaultProps = {
  title: "",
  open: false,
  onClose: undefined,
  onConfirm: undefined
};

export default EnterMeetingDialog;
