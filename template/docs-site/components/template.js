import React, { PropTypes, Component } from "react";

import Sidebar from "./sidebar";

// Data provided by webpack
const DOCS = DOCFILES; //eslint-disable-line no-undef

const Template = ({ children }) => (
  <div id="app" className="application">
    <Sidebar docs={DOCS} />
    {children}
  </div>
);

Template.propTypes = {
  children: PropTypes.node.isRequired
};

export default Template;
