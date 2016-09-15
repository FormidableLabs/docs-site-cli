import React, { PropTypes } from "react";
import { map } from "lodash";

const Sidebar = ({ docs }) => (
  <div>{map((docs), (item, i) => (
    <div key={i}>{item.fileName}</div>
  ))}</div>
);

Sidebar.propTypes = {
  docs: PropTypes.arrayOf(PropTypes.shape({
    filename: PropTypes.string,
    md: PropTypes.string
  })).isRequired
};

export default Sidebar;
