const STORAGE_KEY_MEETING_SETTINGS = "meetingSettings";

export default {
  getMeetingSettings: defaultValue => {
    const item = localStorage.getItem(STORAGE_KEY_MEETING_SETTINGS);

    if (item) {
      return JSON.parse(item);
    }

    return defaultValue;
  },

  setMeetingSettings: settings => {
    localStorage.setItem(
      STORAGE_KEY_MEETING_SETTINGS,
      JSON.stringify(settings)
    );
  }
};
