import React from "react";
import PropTypes from "prop-types";
import Checkbox from "@material-ui/core/Checkbox";
import Tooltip from "@material-ui/core/Tooltip";
import Notifications from "@material-ui/icons/Notifications";
import NotificationsOff from "@material-ui/icons/NotificationsOff";

const NotificationCheckbox = ({ isDisabled, onChange }) => (
  <Tooltip title={`${isDisabled ? "Enable" : "Disable"} notification`}>
    <Checkbox
      icon={<Notifications />}
      checkedIcon={<NotificationsOff />}
      checked={isDisabled}
      onChange={onChange}
    />
  </Tooltip>
);

NotificationCheckbox.propTypes = {
  isDisabled: PropTypes.bool.isRequired,
  onChange: PropTypes.func.isRequired
};

export default NotificationCheckbox;
