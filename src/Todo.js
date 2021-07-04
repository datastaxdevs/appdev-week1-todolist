import React from "react";
import classnames from "classnames";

function Todo (props) {
  const { todo, completeRestTodo, deleteRestTodo } = props;

  return (
    <li
      className={classnames({
        completed: todo.completed,
      })}
    >

    <div className="view">
      <input
        className="toggle"
        type="checkbox"
        checked={todo.completed}
        onChange={() => completeRestTodo(todo.id, todo.text, todo.completed)}
      />
      <label>{todo.text}</label>
      <button className="destroy" onClick={() => deleteRestTodo(todo.id)} />
    </div>
    </li>
  );
}

export default Todo;
