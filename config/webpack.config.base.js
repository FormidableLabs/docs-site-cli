"use strict";
const path = require("path");
const { siteFolder } = require("../config/config");

const NODE_MODULES = path.join(process.cwd(), "./node_modules");
const ROOT = process.env.TARGET;
const SRC = path.join(ROOT, siteFolder);

module.exports = {
  entry: {
    main: [path.join(SRC, "./index.js")]
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
  }
};
