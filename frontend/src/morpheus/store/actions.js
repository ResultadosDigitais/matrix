export const ADD_ERROR = "ADD_ERROR";
export const SET_CURRENT_USER = "SET_CURRENT_USER";
export const SET_CURRENT_ROOM = "SET_CURRENT_ROOM";
export const ADD_ROOMS = "ADD_ROOMS";
export const SYNC_OFFICE = "SYNC_OFFICE";
export const CHANGE_OFFICE_FILTER = "CHANGE_OFFICE_FILTER";
export const CHANGE_USERS_FILTER = "CHANGE_USERS_FILTER";
export const ADD_USER = "ADD_USER";
export const REMOVE_USER = "REMOVE_USER";
export const USER_ENTER_MEETING = "USER_ENTER_MEETING";
export const USER_LEFT_MEETING = "USER_LEFT_MEETING";
export const CHANGE_SYSTEM_SETTING = "CHANGE_SYSTEM_SETTING";
export const CHANGE_MEETING_SETTING = "CHANGE_MEETING_SETTING";
export const TOGGLE_MESSAGE_DIALOG = "TOGGLE_MESSAGE_DIALOG";
export const TOGGLE_THEME = "TOGGLE_THEME";
export const OPEN_LOGOUT_CONFIRM_DIALOG = "OPEN_LOGOUT_CONFIRM_DIALOG";
export const CLOSE_LOGOUT_CONFIRM_DIALOG = "CLOSE_LOGOUT_CONFIRM_DIALOG";
export const TOGGLE_NOTIFICATION = "TOGGLE_NOTIFICATION";

export const setCurrentUser = user => ({
  type: SET_CURRENT_USER,
  user
});

export const setCurrentRoom = room => ({
  type: SET_CURRENT_ROOM,
  room
});

export const addRooms = rooms => ({
  type: ADD_ROOMS,
  rooms
});

export const syncOffice = usersInRoom => ({
  type: SYNC_OFFICE,
  usersInRoom
});

export const changeOfficeFilter = (key, value) => ({
  type: CHANGE_OFFICE_FILTER,
  key,
  value
});

export const changeUsersFilter = (key, value) => ({
  type: CHANGE_USERS_FILTER,
  key,
  value
});

export const addUser = (user, roomId) => ({
  type: ADD_USER,
  user,
  roomId
});

export const removeUser = userId => ({
  type: REMOVE_USER,
  userId
});

export const addError = error => ({
  type: ADD_ERROR,
  message: error ? error.message : "An unknown error has occurred."
});

export const userEnterMeeting = (user, roomId) => ({
  type: USER_ENTER_MEETING,
  user,
  roomId
});

export const userLeftMeeting = (user, roomId) => ({
  type: USER_LEFT_MEETING,
  user,
  roomId
});

export const changeSystemSetting = (key, value) => ({
  type: CHANGE_SYSTEM_SETTING,
  key,
  value
});

export const changeMeetingSetting = (key, value) => ({
  type: CHANGE_MEETING_SETTING,
  key,
  value
});

export const showMessageDialog = (title, message) => ({
  type: TOGGLE_MESSAGE_DIALOG,
  props: {
    isOpen: true,
    title,
    message
  }
});

export const closeMessageDialog = () => ({
  type: TOGGLE_MESSAGE_DIALOG,
  props: {
    isOpen: false,
    title: undefined,
    message: undefined
  }
});

export const toggleTheme = () => ({
  type: TOGGLE_THEME
});

export const openLogoutConfirmDialog = () => ({
  type: OPEN_LOGOUT_CONFIRM_DIALOG
});

export const closeLogoutConfirmDialog = () => ({
  type: CLOSE_LOGOUT_CONFIRM_DIALOG
});

export const toggleNotification = () => ({
  type: TOGGLE_NOTIFICATION
});
