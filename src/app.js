import React, { Component } from 'react';
import Header from './Header';
import TodoList from './TodoList';
import api from './utils/api';
import uuid from 'node-uuid';
import { Hook, Console, Decode } from 'console-feed';
import ScrollToBottom from 'react-scroll-to-bottom';

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

    api.getRestTodos().then((restTodos) => this.setState({ restTodos }));
	};

	deleteRestTodo = async (id) => {
		await api.deleteRestTodo(id);
		api.getRestTodos().then((restTodos) => this.setState({ restTodos }));
	};

	completeRestTodo = async (id, text, completed) => {
		await api.updateRestTodo({
			id,
			text,
			completed: !completed,
		});
		api.getRestTodos().then((restTodos) => this.setState({ restTodos }));
	};

	componentDidMount = async () => {
		Hook(window.console, (log) => {
			this.setState(({ logs }) => ({ logs: [...logs, Decode(log)] }));
		});
		api.getRestTodos().then((restTodos) => this.setState({ restTodos }));
	};

	getRestTodos = async () => {
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
			<div>
				<div>
					<div>
						<div className="todos">
							<Header title="REST todos" addTodo={this.actions.addRestTodo}  type="rest"/>
							<TodoList type="rest" todos={this.state.restTodos} actions={this.actions} />
						</div>
					</div>
				</div>
			</div>
		);
	}
}

export default App;
