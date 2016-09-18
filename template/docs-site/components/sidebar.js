import React, { PropTypes } from "react";
import { Link } from "react-router";
import { map } from "lodash";

const Sidebar = ({ docs }) => (
  <aside className="side-menu">
    <menu role="menu">
      {map((docs), (item, i) => (
        <li key={i}><Link to={item.route}>{item.title}</Link></li>
      ))}
    </menu>
  </aside>
);

Sidebar.propTypes = {
  docs: PropTypes.arrayOf(PropTypes.shape({
    route: PropTypes.string,
    title: PropTypes.string
  })).isRequired
};

export default Sidebar;
