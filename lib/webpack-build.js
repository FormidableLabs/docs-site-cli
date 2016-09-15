#!/usr/bin/env node
"use strict";
const spawn = require("cross-spawn");
const path = require("path");

const webpackBuild = (docs) => {

  const env = process.env;
  env.TARGET = process.cwd();
  env.DOCS = JSON.stringify(docs);

  // run build script, passing cwd as env var
  const child = spawn("npm", ["run", "build"], {
    cwd: path.resolve(__dirname),
    stdio: [null, null, null, null],
    detached: true,
    env
  });

  // @TODO improve output
  child.stdout.on("data", (data) => {
    console.log(`stdout: ${data}`);
  });

  child.stderr.on("data", (data) => {
    console.log(`stderr: ${data}`);
  });

  child.on("close", (code) => {
    console.log(`Webpack compile finished with with code ${code}`);
  });
};

module.exports = webpackBuild;
