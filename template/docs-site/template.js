import React, { PropTypes } from "react";
import { find } from "lodash";

import Sidebar from "./components/sidebar";
import Markdown from "./components/markdown";

const Template = ({ docs }) => {
  const kitchenSink = find(docs, { fileName: "kitchen-sink.md" });
  return (
    <div id="app">
      <Sidebar docs={docs} />
      <main>
        <Markdown markdown={kitchenSink.md} />
      </main>
    </div>
  );
};

Template.propTypes = {
  docs: PropTypes.array.isRequired
};

export default Template;
