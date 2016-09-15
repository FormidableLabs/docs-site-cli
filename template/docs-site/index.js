import React from "react";
import { render } from "react-dom";
import { renderToString } from "react-dom/server";

import index from "./index.hbs";
import Template from "./template";

// Data provided by webpack
const docs = DOCFILES; //eslint-disable-line no-undef

if (typeof window !== "undefined" && window.__STATIC_GENERATOR !== true) {
  render(
    <Template docs={docs} />,
    document.getElementById("content")
  );
}

// Exported static site renderer
export default (locals, callback) => {
  callback(
    null, index({
      content: renderToString(<Template docs={docs} />),
      bundleJs: locals.assets.main
    }));
};
