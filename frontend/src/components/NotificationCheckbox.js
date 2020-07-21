import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Checkbox from "@material-ui/core/Checkbox";
import Tooltip from "@material-ui/core/Tooltip";
import IconButton from "@material-ui/core/IconButton";
import Notifications from "@material-ui/icons/Notifications";
import NotificationsOff from "@material-ui/icons/NotificationsOff";
import NotificationImportant from "@material-ui/icons/NotificationImportant";

import {
  isNotificationEnabled,
  isNotificationBlocked,
  browserHasSupport,
  requestPermissionToNotify
} from "../notification";
import { showMessageDialog } from "../morpheus/store/actions";

const NotificationCheckbox = ({ onChange, openMessageDialog, isDisabled }) => {
  const [isAllowed, toggleAllowed] = useState(isNotificationEnabled());

  const { t } = useTranslation();

  if (!browserHasSupport()) {
    return (
      <Tooltip title={t("notification:unsupported-browser")}>
        <NotificationsOff />
      </Tooltip>
    );
  }

  if (!isAllowed) {
    return (
      <Tooltip title={t("notification:request-permission")}>
        <IconButton
          onClick={() => {
            if (isNotificationBlocked()) {
              openMessageDialog(
                t("notification:blocked"),
                t("notification:unlock")
              );
            } else {
              requestPermissionToNotify(hasPermission => {
                if (hasPermission) {
                  toggleAllowed(true);
                }
              });
            }
          }}
          color="inherit"
        >
          <NotificationImportant />
        </IconButton>
      </Tooltip>
    );
  }

  return (
    <Tooltip title={isDisabled ? t("notification:enable") : t("notification:disable")}>
      <Checkbox
        icon={<Notifications />}
        checkedIcon={<NotificationsOff />}
        checked={isDisabled}
        onChange={onChange}
      />
    </Tooltip>
  );
};

NotificationCheckbox.propTypes = {
  onChange: PropTypes.func.isRequired,
  openMessageDialog: PropTypes.func.isRequired,
  isDisabled: PropTypes.bool.isRequired
};

const mapDispatchToProps = {
  openMessageDialog: showMessageDialog
};

export default connect(
  null,
  mapDispatchToProps
)(NotificationCheckbox);
