import React from "react";
import PropTypes from "prop-types";
import IconButton from "@material-ui/core/IconButton";
import ExitToApp from "@material-ui/icons/ExitToApp";
import Share from "@material-ui/icons/Share";
import Tooltip from "@material-ui/core/Tooltip";

import ThemeCheckbox from "./ThemeCheckbox";
import NotificationCheckbox from "./NotificationCheckbox";
import { SettingsPropType } from "../morpheus/store/models";
import LanguageSwitcher from "./LanguageSwitcher";

const MenuRoom = ({
  onExitRoom,
  onShare,
  onChangeNotification,
  onChangeTheme,
  settings
}) => (
  <>
    <ThemeCheckbox onChange={onChangeTheme} />
    <LanguageSwitcher />
    <NotificationCheckbox
      isDisabled={settings.notificationDisabled}
      onChange={onChangeNotification}
    />
    <Tooltip title="Share room link">
      <IconButton
        aria-label="Share room link"
        aria-controls="menu-appbar"
        onClick={onShare}
        color="inherit"
      >
        <Share />
      </IconButton>
    </Tooltip>
    <Tooltip title="Exit room">
      <IconButton
        aria-label="Exit room"
        aria-controls="menu-appbar"
        onClick={onExitRoom}
        color="inherit"
      >
        <ExitToApp />
      </IconButton>
    </Tooltip>
  </>
);

MenuRoom.propTypes = {
  onExitRoom: PropTypes.func.isRequired,
  onShare: PropTypes.func.isRequired,
  onChangeNotification: PropTypes.func.isRequired,
  onChangeTheme: PropTypes.func.isRequired,
  settings: SettingsPropType.isRequired
};

export default MenuRoom;
