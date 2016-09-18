"use strict";
const path = require("path");
const webpack = require("webpack");

const base = require("./webpack.config.base");
const { siteFolder } = require("../config/config");

const ROOT = process.env.TARGET;
const SRC = path.join(ROOT, siteFolder);

module.exports = {
  devServer: {
    contentBase: SRC,
    noInfo: false
  },
  output: {
    path: SRC,
    filename: "main.js"
  },
  cache: true,
  context: SRC,
  devtool: "source-map",
  entry: base.entry,
  resolve: base.resolve,
  module: {
    loaders: base.module.loaders.concat([
      {
        test: /\.css$/,
        loaders: [
          require.resolve("style-loader"),
          require.resolve("css-loader"),
          require.resolve("postcss-loader")
        ]
      }
    ])
  },
  postcss: base.postcss,
  plugins: [
    new webpack.DefinePlugin({
      "process.env": {
        NODE_ENV: JSON.stringify("development")
      },
      "DOCFILES": process.env.DOCS
    }),
    new webpack.NoErrorsPlugin()
  ]
};
