#!/usr/bin/env node
"use strict";
const fs = require("fs-extra");
const path = require("path");

const createDocs = (docsDir) => {

  const getMarkdown = (docPath, enc) => {
    return new Promise((fulfill, reject) => {
      fs.readFile(docPath, enc, (err, md) => {
        if (err) {
          reject(err);
        } else {
          fulfill(md);
        }
      });
    });
  };

  const promiseArray = [];
  const docsPages = [];

  return new Promise((fulfill) => {
    fs.walk(docsDir)
      .on("data", (item) => {
        if (!item.stats.isFile()) {
          return;
        }
        const fileName = path.basename(item.path);

        promiseArray.push(getMarkdown(item.path, "utf8").then((md) => {
          docsPages.push({ fileName, md });
        }));
      }).on("end", () => {
        Promise.all(promiseArray).then(() => {
          fulfill(docsPages);
        });
      });
  });
};

module.exports = createDocs;
