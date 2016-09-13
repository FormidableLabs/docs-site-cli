#!/usr/bin/env node
"use strict";
const { docsDir, siteDir, templateDir } = require("../config/config");

const fs = require("fs");
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

/**
 * Create new docs scaffolding
 */
if (program.new) {
  if (!fs.existsSync(docsDir) && !fs.existsSync(siteDir)) {
    copyTemplate(templateDir, process.cwd());

    return;
  }

  console.log("Error! The /docs or /site-docs directory already exists!");
}

/**
 * Build the docs
 */
if (program.build) {
  // We need to run webpack from the cli's __dirname, as we take a dep on webpack
  // Webpack will compile the files in /docs-site in the cwd
  const child = spawn("webpack", [], {
    stdio: "inherit",
    detached: true,
    cwd: __dirname
  });

}
