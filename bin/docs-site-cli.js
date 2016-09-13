#!/usr/bin/env node
"use strict";
const { docsFolder, siteFolder, outputFolder } = require("../config/config");

const path = require("path");
const fs = require("fs-extra");
const commander = require("commander");
const spawn = require("cross-spawn");
const copyTemplate = require("../lib/copy-template");
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

const folderExists = (folder) => {
  const folderPath = path.join(process.cwd(), folder);
  return fs.existsSync(folderPath);
};

const removeFolder = (folder) => {
  const folderPath = path.join(process.cwd(), folder);
  return fs.removeSync(folderPath);
};

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
  const env = process.env;
  env.TARGET = process.cwd();

  // clean the output dir
  if (folderExists(outputFolder)) {
    removeFolder(outputFolder);
  }

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

}
