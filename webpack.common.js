const path = require("path");
const webpack = require("webpack");
const ManifestPlugin = require('webpack-manifest-plugin');
const sourcePath = path.join(__dirname, "frontend");
const buildPath = path.join(__dirname, "public", "dist");

module.exports = {
  entry: {
    office: `${sourcePath}/office.js`,
    login: `${sourcePath}/login.js`
  },
  plugins: [
    new webpack.ProvidePlugin({
      $: "jquery",
      jQuery: "jquery"
    }),
    new ManifestPlugin()
  ],
  output: {
    path: buildPath,
    filename: "[name]-[contenthash].js"
  }
};
