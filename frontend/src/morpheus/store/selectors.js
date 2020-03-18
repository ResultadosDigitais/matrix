export const selectCurrentRoom = state => state.currentRoom;

export const selectRooms = state => state.rooms;

export const selectCurrentUser = state => state.currentUser;

export const selectOffice = state => state.office;

export const selectOfficeFilter = state => state.officeFilter;

export const selectUsers = state => state.users;

export const selectUsersFilter = state => state.usersFilter;

export const selectError = state => state.error;

export const selectSystemSettings = state => state.systemSettings;

export const selectMeetingSettings = state => state.meetingSettings;

export const selectMeetingSettingByKey = (state, key) =>
  selectMeetingSettings(state)[key];

export const selectMessageDialog = state => state.messageDialog;

export const selectTheme = state => state.theme;

export const selectIsLogoutDialogOpen = state => state.logoutDialog.isOpen;
