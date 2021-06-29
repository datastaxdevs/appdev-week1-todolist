import React, { Component } from "react";
import Todo from "./Todo";
import Footer from "./Footer";

const TODO_FILTERS = {
  SHOW_ALL: () => true,
  SHOW_ACTIVE: (todo) => !todo.completed,
  SHOW_COMPLETED: (todo) => todo.completed,
};

export default class TodoList extends Component {
  state = { filter: "SHOW_ALL" };

  handleShow = (filter) => {
    this.setState({ filter });
  };

  handleClearCompletedDoc = () => {
    this.props.actions.clearCompletedDoc();
  };

  renderToggleAll(type, completedCount) {
    const { todos, actions } = this.props;
    if (todos.length > 0) {
      if (completedCount === todos.length) {
        return (
          <input
            className="toggle-all"
            type="checkbox"
            checked={completedCount === todos.length}
            onChange={()=>actions.clearCompleted(type)}
          />
        );
      }
      return (
        <input
          className="toggle-all"
          type="checkbox"
          checked={completedCount === todos.length}
          onChange={()=>actions.completeAll(type)}
          
        />
      );
  }
}

  renderFooter(type, completedCount) {
    const { todos } = this.props;
    const { filter } = this.state;
    const activeCount = todos.length - completedCount;

    if (todos.length) {
      return (
        <Footer
          completedCount={completedCount}
          activeCount={activeCount}
          filter={filter}
          onShow={this.handleShow.bind(this)}
          onClearCompleted={this.handleClearCompletedDoc.bind(this)}
        />
      );
    }
  }

  render() {
    const { todos, actions, type } = this.props;
    const { filter } = this.state;
    const filteredTodos = todos.filter(TODO_FILTERS[filter]);

    const completedCount = todos.reduce((count, todo) => {
      return todo.completed ? count + 1 : count;
    }, 0);

    if (!todos.length) {
      return (
        <section className="main">
            <ul className="todo-list"></ul>
        </section>
      )
    }


    return (
      <section className="main">
          <ul className={`todo-list ${type}`}>
            {filteredTodos.map((todo) => (
              <Todo type={type} key={todo.id} todo={todo} {...actions} />
            ))}
          </ul>

        {this.renderFooter(type, completedCount)}
      </section>
    );
  }
}
