const path = require("path");
// Point to all the things
module.exports = {
  templateDir: path.join(__dirname, "../template"),
  docsDir: path.join(process.cwd(), "./docs"),
  siteDir: path.join(process.cwd(), "./docs-site"),
  outputDir: path.join(process.cwd(), "./docs-dist")
};
