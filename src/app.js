import React, { Component } from 'react';
import Header from './Header';
import TodoList from './TodoList';
import api from './utils/api';
import uuid from 'node-uuid';

class App extends Component {
	constructor(props) {
		super(props);
		this.state = {
			restTodos: [],
			logs: [],
		};
	}

	addRestTodo = async (text) => {
		await api.addRestTodo({
			id: uuid.v1(),
			completed: false,
			text: text,
			key: 'rest',
		})

    	this.getRestTodos();
	};

	deleteRestTodo = async (id) => {
		await api.deleteRestTodo(id);
		this.getRestTodos();
	};

	completeRestTodo = async (id, text, completed) => {
		await api.updateRestTodo({
			id,
			text,
			completed: !completed,
		});

		this.getRestTodos();
	};

	componentDidMount = async () => {
		this.getRestTodos();
	};

	getRestTodos = async () => {
		// Reload the todo list from the database to see the latest changes
		api.getRestTodos().then((restTodos) => this.setState({ restTodos }));
	};

	async completeAll(type) {
		return this.completeRestAll();
	}

	async clearCompleted(type) {
		await this.clearRestCompleted();
	}

	clearRestCompleted = async () => {
		let docTodos = api.getRestTodos();
		docTodos.forEach((todo) => {
			this.completeRestTodo(todo.id, todo.text, true);
		});
	};

	actions = {
		addRestTodo: this.addRestTodo,
		completeRestTodo: this.completeRestTodo,
		clearCompleted: this.clearCompleted,
		completeAll: this.completeAll,
		clearRestCompleted: this.clearRestCompleted,
		getRestTodos: this.getRestTodos,
		deleteRestTodo: this.deleteRestTodo,
	};

	render() {
		return (

			<div className="todos">
				<Header title="REST todos" addTodo={this.actions.addRestTodo}  type="rest"/>
				<TodoList type="rest" todos={this.state.restTodos} actions={this.actions} />
			</div>

		);
	}
}

export default App;
