import React from "react";
import { Route, IndexRoute } from "react-router";

// Components
import Template from "./template";
import Page from "./components/page";

module.exports = (
  <Route path="/" component={Template}>
    <IndexRoute component={Page} />
    <Route path="/:slug" component={Page} />
  </Route>
);
