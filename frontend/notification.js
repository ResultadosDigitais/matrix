const NOTIFICATION_PERMISSION_GRANTED = "granted";
const NOTIFICATION_PERMISSION_DENIED = "denied";

export const isNotificationEnabled = () =>
  Notification.permission === NOTIFICATION_PERMISSION_GRANTED;

export const isNotificationBlocked = () =>
  Notification.permission === NOTIFICATION_PERMISSION_DENIED;

export const requestPermissionToNotify = callback => {
  Notification.requestPermission(permission => {
    callback(permission === NOTIFICATION_PERMISSION_GRANTED);
  });
};

export const showBrowserNotification = message => {
  new Notification(message);
};
