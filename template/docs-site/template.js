import React, { PropTypes, Component } from "react";
import Typography from "typography";

import Sidebar from "./components/sidebar";
require("./style.css");

const typography = new Typography({
  baseFontSize: "18px",
  baseLineHeight: "30px",
  headerFontFamily: ["Avenir Next", "Helvetica Neue", "Segoe UI", "Helvetica", "Arial", "sans-serif"], // eslint-disable-line max-len
  bodyFontFamily: ["Georgia", "serif"]
});

// Data provided by webpack
const DOCS = DOCFILES; //eslint-disable-line no-undef

class Template extends Component {
  componentWillMount() {
    typography.injectStyles();
  }

  render() {
    return (
      <div id="app">
        <Sidebar docs={DOCS} />
        {this.props.children}
      </div>
    );
  }
}

Template.propTypes = {
  children: PropTypes.node.isRequired
};

export default Template;
