"use strict";
const path = require("path");
const webpack = require("webpack");
const StaticSiteGeneratorPlugin = require("static-site-generator-webpack-plugin");

const { outputFolder } = require("../config/config");
const base = require("./webpack.config.base");

const staticRoutes = process.env.STATIC_ROUTES;
const ROOT = process.env.TARGET;

module.exports = {
  entry: base.entry,
  output: {
    path: path.join(ROOT, outputFolder),
    filename: "main.[hash].js",
    libraryTarget: "umd" // Needs to be universal for `static-site-generator-webpack-plugin` to work
  },
  resolve: base.resolve,
  module: base.module,
  plugins: [
    new webpack.DefinePlugin({
      "process.env": {
        NODE_ENV: JSON.stringify("production")
      },
      "DOCFILES": process.env.DOCS
    }),
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      }
    }),
    new StaticSiteGeneratorPlugin("main", JSON.parse(staticRoutes), null, {
      // Shim browser globals.
      window: {
        // Optional client-side render checks whether document is undefined
        // instead check whether it's being shimmed
        __STATIC_GENERATOR: true
      }
    })
  ]
};
