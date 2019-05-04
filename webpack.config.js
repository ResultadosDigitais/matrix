const path = require("path");
const sourcePath = path.join(__dirname, "frontend");
const buildPath = path.join(__dirname, "public", "dist");

module.exports = {
  entry: {
    office: `${sourcePath}/office.js`,
    login: `${sourcePath}/login.js`
  },
  output: {
    path: buildPath,
    filename: "[name]-bundle.js"
  }
};
