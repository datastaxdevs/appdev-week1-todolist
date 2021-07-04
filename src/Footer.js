import React, { useEffect } from 'react';
import classnames from "classnames";

const FILTER_TITLES = {
  SHOW_ALL: "All",
  SHOW_ACTIVE: "Active",
  SHOW_COMPLETED: "Completed",
};

function Footer (props) {
  const { activeCount } = props;

  const renderTodoCount = () => {
    const itemWord = activeCount === 1 ? "item" : "items";

    return (
      <span className="todo-count">
        <strong>{activeCount || "No"}</strong>&nbsp;
        {itemWord} left
      </span>
    );
  }

  const renderFilterLink = (filter) => {
    const title = FILTER_TITLES[filter];
    const { filter: selectedFilter, onShow } = props;

    return (
      <button className={classnames({ selected: filter === selectedFilter })}
      onClick={() => onShow(filter)} style={{ cursor: "pointer" }}>{title}</button>
    );
  }

  const renderFilterList = () => {
    return ["SHOW_ALL", "SHOW_ACTIVE", "SHOW_COMPLETED"].map((filter) => (
      <li key={filter}>{renderFilterLink(filter)}</li>
    ));
  }

  useEffect(() => {
		console.log("PROP Change: Active items is %d", activeCount);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [activeCount]);

  return (
    <footer className="footer">
      {renderTodoCount()}
      <ul className="filters">{renderFilterList()}</ul>
    </footer>
  );
}

export default Footer;