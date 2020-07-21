import React from "react";
import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";
import IconButton from "@material-ui/core/IconButton";
import ExitToApp from "@material-ui/icons/ExitToApp";
import Share from "@material-ui/icons/Share";
import Tooltip from "@material-ui/core/Tooltip";

import LanguageSwitcher from "./LanguageSwitcher";
import ThemeCheckbox from "./ThemeCheckbox";
import NotificationCheckbox from "./NotificationCheckbox";
import { SettingsPropType } from "../morpheus/store/models";

const MenuRoom = ({
  onExitRoom,
  onShare,
  onChangeSettings,
  onChangeTheme,
  settings
}) => {
  const { t } = useTranslation();

  return (
    <>
      <ThemeCheckbox onChange={onChangeTheme} />
      <LanguageSwitcher />
      <NotificationCheckbox
        isDisabled={settings.notificationDisabled}
        onChange={event => {
          onChangeSettings("notificationDisabled", event.target.checked);
        }}
      />
      <Tooltip title={t("meeting:share-room")}>
        <IconButton
          onClick={onShare}
          color="inherit"
        >
          <Share />
        </IconButton>
      </Tooltip>
      <Tooltip title={t("meeting:leave-room")}>
        <IconButton
          onClick={onExitRoom}
          color="inherit"
        >
          <ExitToApp />
        </IconButton>
      </Tooltip>
    </>
  );
};

MenuRoom.propTypes = {
  onExitRoom: PropTypes.func.isRequired,
  onShare: PropTypes.func.isRequired,
  onChangeSettings: PropTypes.func.isRequired,
  onChangeTheme: PropTypes.func.isRequired,
  settings: SettingsPropType.isRequired
};

export default MenuRoom;
