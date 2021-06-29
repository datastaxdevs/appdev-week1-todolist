import React, { Component } from "react";
import classnames from "classnames";
import TodoTextInput from "./TodoTextInput";

export default class Todo extends Component {
  state = {
    editing: false,
  };

  handleDocDoubleClick = () => {
    this.setState({ editing: true });
  };

  handleDocSave = (id, text, completed) => {
    if (text.length === 0) {
      this.props.deleteDocTodo(id);
    } else {
      this.props.editDocTodo(id, text, completed);
    }
    this.setDocState({ editing: false });
  };

  render() {
    const { todo, completeDocTodo, deleteDocTodo, completeRestTodo, deleteRestTodo, completeGQTodo, deleteGQTodo, type } = this.props;

    let element;
    if (type === "rest") {
      if (this.state.editing) {
        element = (
          <TodoTextInput
            text={todo.text}
            editing={this.state.editing}
            onSave={(text) => this.handleRestSave(todo.id, text, todo.completed)}
          />
        );
      } else {
        element = (
          <div className="view">
            <input
              className="toggle"
              type="checkbox"
              checked={todo.completed}
              onChange={() => completeRestTodo(todo.id, todo.text, todo.completed)}
            />
            <label onDoubleClick={this.handleDoubleClick}>{todo.text}</label>
            <button className="destroy" onClick={() => deleteRestTodo(todo.id)} />
          </div>
        );
        }
       } else if (type === "graphql") {
        if (this.state.editing) {
          element = (
            <TodoTextInput
              text={todo.text}
              editing={this.state.editing}
              onSave={(text) => this.handleGQSave(todo.id, text, todo.completed)}
            />
          );
        } else {
          element = (
            <div className="view">
              <input
                className="toggle"
                type="checkbox"
                checked={todo.completed}
                onChange={() => completeGQTodo(todo.id, todo.text, todo.completed)}
              />
              <label onDoubleClick={this.handleDoubleClick}>{todo.text}</label>
              <button className="destroy" onClick={() => deleteGQTodo(todo.id)} />
            </div>
          );
        
        }
      } else if (type === "doc"){
      if (this.state.editing) {
        element = (
          <TodoTextInput
            text={todo.text}
            editing={this.state.editing}
            onSave={(text) => this.handleDocSave(todo.id, text, todo.completed)}
          />
        );
      } else {
        element = (
          <div className="view">
            <input
              className="toggle"
              type="checkbox"
              checked={todo.completed}
              onChange={() => completeDocTodo(todo.id, todo.text, todo.completed)}
            />
            <label onDoubleClick={this.handleDoubleClick}>{todo.text}</label>
            <button className="destroy" onClick={() => deleteDocTodo(todo.id)} />
          </div>
        );
      }
    }

    return (
      <li
        className={classnames({
          completed: todo.completed,
          editing: this.state.editing,
        })}
      >
        {element}
      </li>
    );
  }
}
