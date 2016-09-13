#!/usr/bin/env node
"use strict";
const fs = require("fs-extra");

const copyTemplate = (source, target) => {
  try {
    fs.copySync(source, target);
    console.log("Created new docs project!");
  } catch (err) {
    console.error(err);
  }
};

module.exports = copyTemplate;
