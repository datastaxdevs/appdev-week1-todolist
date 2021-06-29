import React, { Component } from "react";
import classnames from "classnames";

const FILTER_TITLES = {
  SHOW_ALL: "All",
  SHOW_ACTIVE: "Active",
  SHOW_COMPLETED: "Completed",
};

export default class Footer extends Component {
  renderTodoCount() {
    const { activeCount } = this.props;

    const itemWord = activeCount === 1 ? "item" : "items";

    return (
      <span className="todo-count">
        <strong>{activeCount || "No"}</strong>&nbsp;
        {itemWord} left
      </span>
    );
  }

  renderFilterLink(filter) {
    const title = FILTER_TITLES[filter];
    const { filter: selectedFilter, onShow } = this.props;

    return (
      <button className={classnames({ selected: filter === selectedFilter })}
      onClick={() => onShow(filter)} style={{ cursor: "pointer" }}>{title}</button>
    );
  }

  renderFilterList() {
    return ["SHOW_ALL", "SHOW_ACTIVE", "SHOW_COMPLETED"].map((filter) => (
      <li key={filter}>{this.renderFilterLink(filter)}</li>
    ));
  }

  render() {
    return (
      <footer className="footer">
        {this.renderTodoCount()}
        <ul className="filters">{this.renderFilterList()}</ul>
      </footer>
    );
  }
}
