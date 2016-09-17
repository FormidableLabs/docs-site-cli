#!/usr/bin/env node
"use strict";
const path = require("path");
const commander = require("commander");

const { docsFolder, siteFolder, outputFolder } = require("../config/config");
const { folderExists, removeFolder } = require("../lib/util");
const copyTemplate = require("../lib/copy-template");
const createDocs = require("../lib/create-docs");
const webpack = require("../lib/webpack");
const pkg = require("../package.json");

const ROOT = __dirname;
const SRC = process.cwd();
const program = new commander.Command("docs-site-cli");

program.version(pkg.version);
program.option("build", "Build the docs");
program.option("dev", "Docs site development");
program.option("new", "Create a new project");
program.usage("[script]");
program.parse(process.argv);

if (program.rawArgs.length < 1) {
  program.outputHelp();
  return;
}

if (program.new) {
  if (folderExists(docsFolder) || folderExists(siteFolder)) {
    console.error("Error! The /docs or /site-docs directory already exists!");

    return;
  }

  copyTemplate(path.join(ROOT, "../template"), SRC);
}

if (program.dev) {
  if (!folderExists(docsFolder) || !folderExists(siteFolder)) {
    console.error("Error! The /docs or /site-docs folder was not found. Run `docs-site-cli new` to setup these folders");  // eslint-disable-line max-len

    return;
  }

  createDocs(path.join(SRC, docsFolder)).then((docs) => webpack(docs, "dev"));
}

if (program.build) {
  if (!folderExists(docsFolder) || !folderExists(siteFolder)) {
    console.error("Error! The /docs or /site-docs folder was not found. Run `docs-site-cli new` to setup these folders"); // eslint-disable-line max-len

    return;
  }

  // clean the output dir
  if (folderExists(outputFolder)) {
    removeFolder(outputFolder);
  }

  createDocs(path.join(SRC, docsFolder)).then((docs) => webpack(docs, "build"));
}
