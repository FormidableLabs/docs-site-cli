#!/usr/bin/env node
"use strict";
const path = require("path");
const fs = require("fs-extra");

const SRC = process.cwd();

const folderExists = (folder) => {
  const folderPath = path.join(SRC, folder);
  return fs.existsSync(folderPath);
};

const removeFolder = (folder) => {
  const folderPath = path.join(SRC, folder);
  return fs.removeSync(folderPath);
};

module.exports = {
  removeFolder,
  folderExists
};
