"use strict";

const path = require("path");
const webpack = require("webpack");

const StaticSiteGeneratorPlugin = require("static-site-generator-webpack-plugin");

const { siteDir, outputDir } = require("../config/config");

// All routes we want to static-render:
const routes = require(path.join(siteDir, "static-routes"));

module.exports = {
  entry: {
    main: [path.join(siteDir, "./index.js")]
  },
  output: {
    path: outputDir,
    filename: "main.[hash].js",
    libraryTarget: "umd" // Needs to be universal for `static-site-generator-webpack-plugin` to work
  },
  resolve: {
    extensions: ["", ".js", ".jsx", ".json"]
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        // Make sure to formidable-landers is excluded for `npm link` purposes
        include: [
          path.resolve(siteDir)
        ],
        loader: require.resolve("babel-loader"),
        query: {
          presets: ["es2015", "stage-1", "react"]
        }
      }, {
        test: /.svg$/,
        loaders: [
          require.resolve("raw-loader"),
          require.resolve("image-webpack-loader")
        ]
      }, {
        test: /\.hbs$/,
        loader: require.resolve("handlebars-loader")
      }, {
        test: /\.md$/,
        loader: require.resolve("raw-loader")
      }, {
        test: /\.json$/,
        loader: require.resolve("json-loader")
      }
    ]
  },
  plugins: [
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      }
    }),
    new StaticSiteGeneratorPlugin("main", routes, null, {
      // Shim browser globals.
      window: {
        // Optional client-side render checks whether document is undefined
        // instead check whether it's being shimmed
        __STATIC_GENERATOR: true
      }
    })
  ]
};
