import React, { PropTypes } from "react";
import { find } from "lodash";
import Markdown from "./markdown";

const DOCS = DOCFILES; //eslint-disable-line no-undef

const Page = ({ location }) => {
  let route = location.pathname;
  if (route.length > 1) {
    route = route.replace(/\//g, ""); // pathname sometimes includes a slash
  }
  const currentDoc = find(DOCS, { route });

  return (
    <main>
      <Markdown markdown={currentDoc.md} />
    </main>
  );
};

Page.propTypes = { location: PropTypes.object.isRequired };

export default Page;
