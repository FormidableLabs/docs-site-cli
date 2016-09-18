import React, { PropTypes } from "react";
import { Link } from "react-router";
import { map } from "lodash";

const Sidebar = ({ docs }) => (
  <ul>{map((docs), (item, i) => (
    <li key={i}><Link to={item.route}>{item.title}</Link></li>
  ))}</ul>
);

Sidebar.propTypes = {
  docs: PropTypes.arrayOf(PropTypes.shape({
    route: PropTypes.string,
    title: PropTypes.string
  })).isRequired
};

export default Sidebar;
