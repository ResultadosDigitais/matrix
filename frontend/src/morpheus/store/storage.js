const STORAGE_KEY_MEETING_SETTINGS = "meetingSettings";
const STORAGE_KEY_THEME = "color-scheme";

const storage = {
  getMeetingSettings: defaultValue => {
    const item = localStorage.getItem(STORAGE_KEY_MEETING_SETTINGS);

    if (item) {
      return {
        ...defaultValue,
        ...JSON.parse(item)
      };
    }

    return defaultValue;
  },

  setMeetingSettings: settings => {
    localStorage.setItem(
      STORAGE_KEY_MEETING_SETTINGS,
      JSON.stringify(settings)
    );
  },

  getTheme: defaultTheme =>
    localStorage.getItem(STORAGE_KEY_THEME) || defaultTheme,

  setTheme: theme => localStorage.setItem(STORAGE_KEY_THEME, theme)
};

export default storage;
