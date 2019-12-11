const KEY_THEME = "color-scheme";

const storage = {
  getTheme: defaultTheme => localStorage.getItem(KEY_THEME) || defaultTheme,

  setTheme: theme => localStorage.setItem(KEY_THEME, theme)
};

export default storage;
