#!/usr/bin/env node
"use strict";
const path = require("path");
const commander = require("commander");

const { docsFolder, siteFolder, outputFolder } = require("../config/config");
const { folderExists, removeFolder } = require("../lib/util");
const copyTemplate = require("../lib/copy-template");
const webpackBuild = require("../lib/webpack-build");
const createDocs = require("../lib/create-docs");
const pkg = require("../package.json");

const program = new commander.Command("docs-site-cli");

program.version(pkg.version);
program.option("build [options]", "Build the docs");
program.option("new [project-name]", "Create a new project");
program.option("-o, --output [dir]", "Override the default output directory (default: /docs-dist)");
program.usage("[script] [options]");
program.parse(process.argv);

if (program.rawArgs.length < 1) {
  program.outputHelp();
  return;
}

/**
 * Create new docs scaffolding
 * Copy the template into the current directory if it doesnt already exist
 */
if (program.new) {
  if (folderExists(docsFolder) || folderExists(siteFolder)) {
    console.log("Error! The /docs or /site-docs directory already exists!");
    return;
  }

  copyTemplate(path.join(__dirname, "../template"), process.cwd());
}

if (program.build) {
  // clean the output dir
  if (folderExists(outputFolder)) {
    removeFolder(outputFolder);
  }

  createDocs(path.join(process.cwd(), docsFolder)).then((docs) => {
    webpackBuild(docs);
  });
}
