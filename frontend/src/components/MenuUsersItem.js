import React from "react";
import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import PhoneForwardedIcon from "@material-ui/icons/PhoneForwarded";

const useStyles = makeStyles(() => ({
  avatarInMeeting: {
    position: "relative",
    "&:after": {
      content: "''",
      position: "absolute",
      top: -2,
      left: -3,
      width: 46,
      height: 40,
      background: "url('/images/headset.svg')",
      backgroundSize: "contain",
      backgroundRepeat: "no-repeat"
    }
  }
}));

const MenuUsersItem = ({
  onInviteUser,
  showInviteAction,
  inMeeting,
  name,
  avatar,
  roomName
}) => {
  const classes = useStyles();

  const { t } = useTranslation();

  return (
    <ListItem>
      <ListItemAvatar>
        <div
          className={clsx({
            [classes.avatarInMeeting]: inMeeting
          })}
        >
          <Avatar alt={name} src={avatar} />
        </div>
      </ListItemAvatar>
      <ListItemText primary={name} secondary={roomName} />
      {showInviteAction && (
        <ListItemSecondaryAction>
          <IconButton edge="end" title={t("meeting:invite-user")} onClick={onInviteUser}>
            <PhoneForwardedIcon />
          </IconButton>
        </ListItemSecondaryAction>
      )}
    </ListItem>
  );
};

MenuUsersItem.propTypes = {
  onInviteUser: PropTypes.func,
  showInviteAction: PropTypes.bool,
  inMeeting: PropTypes.bool,
  name: PropTypes.string,
  avatar: PropTypes.string,
  roomName: PropTypes.string
};

MenuUsersItem.defaultProps = {
  onInviteUser: () => {},
  showInviteAction: false,
  inMeeting: false,
  name: "",
  avatar: "",
  roomName: ""
};

export default MenuUsersItem;
