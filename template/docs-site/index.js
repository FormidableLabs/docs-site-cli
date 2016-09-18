import React from "react";
import { render } from "react-dom";
import { renderToString } from "react-dom/server";
import { RouterContext, match, browserHistory, Router } from "react-router";
import { createMemoryHistory } from "history";
import ReactGA from "react-ga";

import { ga } from "config";
import index from "./index.hbs";
import routes from "./routes";
import "reset.css";
import "./styles/app.css";

if (typeof window !== "undefined" && window.__STATIC_GENERATOR !== true) { //eslint-disable-line no-undef, max-len
  // Add Google Analytics tracking for each page
  if (ga.length > 1) {
    ReactGA.initialize(ga);
  }

  render(
    <Router
      history={browserHistory}
      routes={routes}
    />,
    document.getElementById("content")
  );
}

// Exported static site renderer:
export default (locals, callback) => {
  const history = createMemoryHistory();
  const location = history.createLocation(locals.path);
  match({ routes, location }, (error, redirectLocation, renderProps) => {
    callback(null, index({
      content: renderToString(<RouterContext {...renderProps} />),
      bundleJs: locals.assets.main
    }));
  });
};
