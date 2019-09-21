/* eslint-disable import/no-extraneous-dependencies */

const path = require("path");
const webpack = require("webpack");

const ManifestPlugin = require("webpack-manifest-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const WebpackCleanupPlugin = require("webpack-cleanup-plugin");
const TerserJSPlugin = require("terser-webpack-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");

const sourcePath = path.join(__dirname, "src");
const buildPath = path.join(__dirname, "..", "public", "dist");

const cssRegex = /\.css$/;
const cssModuleRegex = /\.module\.css$/;

const getStyleLoader = cssOptions => [
  {
    loader: MiniCssExtractPlugin.loader,
    options: {
      hmr: process.env.NODE_ENV === "development",
    },
  },
  {
    loader: "css-loader",
    options: cssOptions,
  },
];

module.exports = {
  entry: {
    office: `${sourcePath}/office.js`,
    login: `${sourcePath}/login-application.js`,
    morpheus: `${sourcePath}/morpheus.js`,
  },
  optimization: {
    minimizer: [new TerserJSPlugin({}), new OptimizeCSSAssetsPlugin({})],
  },
  plugins: [
    new WebpackCleanupPlugin(),
    new webpack.ProvidePlugin({
      $: "jquery",
      jQuery: "jquery",
    }),
    new ManifestPlugin(),
    new MiniCssExtractPlugin({
      filename: "[name]-[contenthash].css",
      chunkFilename: "[id].css",
    }),
  ],
  output: {
    path: buildPath,
    filename: "[name]-[contenthash].js",
  },
  module: {
    rules: [
      {
        test: cssRegex,
        exclude: cssModuleRegex,
        use: getStyleLoader({}),
      },
      {
        test: cssModuleRegex,
        use: getStyleLoader({
          modules: true,
        }),
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
        },
      },
    ],
  },
};
