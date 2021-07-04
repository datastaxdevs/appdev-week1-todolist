import React from "react";
import Todo from "./Todo";
import Footer from "./Footer";

const TODO_FILTERS = {
  SHOW_ALL: () => true,
  SHOW_ACTIVE: (todo) => !todo.completed,
  SHOW_COMPLETED: (todo) => todo.completed,
};

function TodoList (props) {
  const { actions, todos } = props;
  const [filter, setFilter] = React.useState("SHOW_ALL");

  const handleShow = (filter) => {
    setFilter(filter);
  };

  const handleClearCompletedDoc = () => {
    actions.clearCompletedDoc();
  };

const renderFooter = (completedCount) => {
    const activeCount = todos.length - completedCount;

    if (todos.length) {
      return (
        <Footer
          completedCount={completedCount}
          activeCount={activeCount}
          filter={filter}
          onShow={handleShow.bind(this)}
          onClearCompleted={handleClearCompletedDoc.bind(this)}
        />
      );
    }
  }

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
        <ul className={`todo-list`}>
          {filteredTodos.map((todo) => (
            <Todo key={todo.id} todo={todo} {...actions} />
          ))}
        </ul>

      {renderFooter(completedCount)}
    </section>
  );
}

export default TodoList;