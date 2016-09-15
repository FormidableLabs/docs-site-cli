"use strict";

const path = require("path");
const webpack = require("webpack");
const StaticSiteGeneratorPlugin = require("static-site-generator-webpack-plugin");

const { siteFolder, outputFolder } = require("../config/config");

const NODE_MODULES = path.join(process.cwd(), "./node_modules");
const ROOT = process.env.TARGET;
const SRC = path.join(ROOT, siteFolder);
const staticRoutes = require(path.join(SRC, "./static-routes.js"));

module.exports = {
  entry: {
    main: [path.join(SRC, "./index.js")]
  },
  output: {
    path: path.join(ROOT, outputFolder),
    filename: "main.[hash].js",
    libraryTarget: "umd" // Needs to be universal for `static-site-generator-webpack-plugin` to work
  },
  resolve: {
    modulesDirectories: [NODE_MODULES],
    extensions: ["", ".js", ".jsx", ".json"]
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        include: [
          path.resolve(SRC)
        ],
        loader: require.resolve("babel-loader"),
        query: {
          presets: [
            require.resolve("babel-preset-es2015"),
            require.resolve("babel-preset-stage-1"),
            require.resolve("babel-preset-react")
          ]
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
    new StaticSiteGeneratorPlugin("main", staticRoutes, null, {
      // Shim browser globals.
      window: {
        // Optional client-side render checks whether document is undefined
        // instead check whether it's being shimmed
        __STATIC_GENERATOR: true
      }
    })
  ]
};
