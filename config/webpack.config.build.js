"use strict";

const webpack = require("webpack");
const StaticSiteGeneratorPlugin = require("static-site-generator-webpack-plugin");

const base = require("./webpack.config.base");
const staticRoutes = process.env.STATIC_ROUTES;

module.exports = {
  entry: base.entry,
  output: base.output,
  resolve: base.resolve,
  module: base.module,
  plugins: base.plugins.concat([
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
  ])
};
