/* global window */

// Fix for React Testing Library
window.Date = Date;

// localStorage mock
global.localStorage = {
  data: {},
  getItem(key) {
    if (this.data[key]) {
      return this.data[key];
    }
    return null;
  },
  setItem(key, value) {
    this.data[key] = value;
  },
  removeItem(key) {
    delete this.data[key];
  },
  clear() {
    this.data = {};
  },
};
