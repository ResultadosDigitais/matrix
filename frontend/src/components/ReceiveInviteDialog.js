import React from "react";
import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

const ReceiveInviteDialog = ({ open, onClose, onConfirm, invitation }) => {
  const { t } = useTranslation();

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>{t("meeting:invite-received")}</DialogTitle>
      <DialogContent>
        <DialogContentText>
          {t("meeting:invite-text", {
            user: invitation.user && invitation.user.name,
            room: invitation.room && invitation.room.name
          })}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          {t("general:no")}
        </Button>
        <Button
          onClick={() => {
            onClose();
            onConfirm();
          }}
          color="primary"
          autoFocus
        >
          {t("meeting:accept-invite")}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

ReceiveInviteDialog.propTypes = {
  invitation: PropTypes.shape({
    user: PropTypes.shape({
      name: PropTypes.string
    }),
    room: PropTypes.shape({
      name: PropTypes.string
    })
  }),
  open: PropTypes.bool,
  onClose: PropTypes.func,
  onConfirm: PropTypes.func
};

ReceiveInviteDialog.defaultProps = {
  invitation: {},
  open: false,
  onClose: undefined,
  onConfirm: undefined
};

export default ReceiveInviteDialog;
