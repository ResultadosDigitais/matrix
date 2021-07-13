const NOTIFICATION_PERMISSION_GRANTED = "granted";
const NOTIFICATION_PERMISSION_DENIED = "denied";

export const browserHasSupport = () => {
  try {
    return !!Notification;
  } catch (e) {
    return false;
  }
}

export const isNotificationEnabled = () => {
  if (!browserHasSupport()) {
    return false;
  }

  return Notification.permission === NOTIFICATION_PERMISSION_GRANTED;
}

export const isNotificationBlocked = () => {
  if (!browserHasSupport()) {
    return true;
  }

  return Notification.permission === NOTIFICATION_PERMISSION_DENIED;
}

export const requestPermissionToNotify = callback => {
  Notification.requestPermission(permission => {
    callback(permission === NOTIFICATION_PERMISSION_GRANTED);
  });
};

export const showBrowserNotification = message => {
  if (isNotificationEnabled()) {
    new Notification(message);
  }
};
