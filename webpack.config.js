module.exports = {
  entry: {
    office: "./frontend/office.web.js",
    profile: "./frontend/profile.web.js"
  },
  output: {
    path: __dirname + "/public",
    filename: "[name]-bundle.js"
  },
  devServer: {
    inline: true,
    contentBase: "./public",
    port: 3333
  }
};
