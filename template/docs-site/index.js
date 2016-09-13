import React from "react";
import { render } from "react-dom";
import { renderToString } from "react-dom/server";

import index from "./index.hbs";
import Template from "./template";

if (typeof window !== "undefined" && window.__STATIC_GENERATOR !== true) {
  render(
    <Template />,
    document.getElementById("content")
  );
}

// Exported static site renderer
export default (locals, callback) => {
  callback(
    null, index({
      content: renderToString(<Template />),
      bundleJs: locals.assets.main
    }));
};
