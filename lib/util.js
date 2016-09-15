#!/usr/bin/env node
"use strict";
const path = require("path");
const fs = require("fs-extra");

const folderExists = (folder) => {
  const folderPath = path.join(process.cwd(), folder);
  return fs.existsSync(folderPath);
};

const removeFolder = (folder) => {
  const folderPath = path.join(process.cwd(), folder);
  return fs.removeSync(folderPath);
};

module.exports = {
  removeFolder,
  folderExists
};
