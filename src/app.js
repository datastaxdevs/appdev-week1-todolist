import React, { Component } from 'react';
import Header from './Header';
import TodoList from './TodoList';
import api from './utils/api';
import uuid from 'node-uuid';
import { Hook, Console, Decode } from 'console-feed';

class App extends Component {
	constructor(props) {
		super(props);
		this.state = {
			restTodos: [],
			docTodos: [],
			GQTodos: [],
			logs: [],
		};
	}

	addDocTodo = async (text) => {
		await api.createDocTodo({
			id: uuid.v1(),
			completed: false,
			text: text,
		})
    api.getDocTodos().then((docTodos) => this.setState({ docTodos }))
    console.table(this.state.docTodos)
	};

	addRestTodo = async (text) => {
		await api.addRestTodo({
			id: uuid.v1(),
			completed: false,
			text: text,
			key: 'rest',
		})
    api.getRestTodos().then((restTodos) => this.setState({ restTodos }));
	};

	addGQTodo = async (text) => {
		let id = uuid.v1();
		await api.addGQTodo({
			id: id,
			text: text,
			completed: 0,
		});
    api.getGQTodos().then((GQTodos) => this.setState({ GQTodos }));
	};

	deleteDocTodo = async (id) => {
		await api.deleteDocTodo(id);
		api.getDocTodos().then((docTodos) => this.setState({ docTodos }))
	};

	deleteRestTodo = async (id) => {
		await api.deleteRestTodo(id);
		api.getRestTodos().then((restTodos) => this.setState({ restTodos }));
	};

	deleteGQTodo = async (id) => {
		await api.deleteGQTodo(id);
		api.getGQTodos().then((GQTodos) => this.setState({ GQTodos }))
	};

	async editDocTodo(id, text, completed) {
		await api.updateDocTodo({
			id,
			text,
			completed,
		});
		api.getDocTodos().then((docTodos) => this.setState({ docTodos }))
	}

	completeDocTodo = async (id, text, completed) => {
		await api.updateDocTodo({
			id,
			text,
			completed: !completed,
		});
		api.getDocTodos().then((docTodos) => this.setState({ docTodos }));
	};

	completeGQTodo = async (id, text, completed) => {
		await api.updateGQTodo({
			id,
			text,
			completed: !completed,
		});
		api.getGQTodos().then((GQTodos) => this.setState({ GQTodos }));
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
		api.getDocTodos().then((docTodos) => this.setState({ docTodos }));
		api.getRestTodos().then((restTodos) => this.setState({ restTodos }));
		api.getGQTodos().then((GQTodos) => this.setState({ GQTodos }));

	};

	getDocTodos = async () => {
		api.getDocTodos().then((docTodos) => this.setState({ docTodos }));
	};

	getRestTodos = async () => {
		api.getRestTodos().then((restTodos) => this.setState({ restTodos }));
	};

	getGQTodos = async () => {
		api.getGQTodos().then((GQTodos) => this.setState({ GQTodos }));
	};

	async completeAll(type) {
		switch (type) {
			case 'doc':
				return this.completeDocAll();
			case 'rest':
				return this.completeRestAll();
			case 'graphql':
				return this.completeGQAll();
			default:
		}
	}

	async completeDocAll() {
		api.getDocTodos().then((todos) => {
			todos.forEach((todo) => {
				this.completeDocTodo(todo.id, todo.text, false);
			});
		});

		return this.getDocTodos();
	}

	async clearDocCompleted() {
		let docTodos = api.getDocTodos();
		docTodos.forEach((todo) => {
			this.completeDocTodo(todo.id, todo.text, true);
		});
		return this.getDocTodos();
	}

	async clearCompleted(type) {
		switch (type) {
			case 'doc':
				await this.clearDocCompleted();
				break;
			case 'rest':
				await this.clearRestCompleted();
				break;
			case 'graphql':
				await this.clearGQCompleted();
				break;
			default:
		}
	}

	clearRestCompleted = async () => {
		let docTodos = api.getRestTodos();
		docTodos.forEach((todo) => {
			this.completeRestTodo(todo.id, todo.text, true);
		});
	};

	clearGQCompleted = async () => {
		let docTodos = api.getGQTodos();
		docTodos.forEach((todo) => {
			this.completeGQTodo(todo.id, todo.text, false);
		});
	};

	actions = {
		addDocTodo: this.addDocTodo,
		addRestTodo: this.addRestTodo,
		addGQTodo: this.addGQTodo,
		deleteDocTodo: this.deleteDocTodo,
		editDocTodo: this.editDocTodo,
		completeDocTodo: this.completeDocTodo,
		completeRestTodo: this.completeRestTodo,
		completeDocAll: this.completeDocAll,
		clearCompleted: this.clearCompleted,
		completeAll: this.completeAll,
		clearDocCompleted: this.clearDocCompleted,
		clearRestCompleted: this.clearRestCompleted,
		getDocTodos: this.getDocTodos,
		getRestTodos: this.getRestTodos,
		getGQTodos: this.getGQTodos,
		deleteGQTodo: this.deleteGQTodo,
		deleteRestTodo: this.deleteRestTodo,
		completeGQTodo: this.completeGQTodo,
	};

	render() {
		return (
			<div>
				<div>
					<div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gridGap: 50 }}>
						<div className="todos">
							<Header title="Doc todos" addTodo={this.actions.addDocTodo} type="doc"/>
							<TodoList type="doc" todos={this.state.docTodos} actions={this.actions} />
						</div>
						<div className="todos">
							<Header title="REST todos" addTodo={this.actions.addRestTodo}  type="rest"/>
							<TodoList type="rest" todos={this.state.restTodos} actions={this.actions} />
						</div>
						<div className="todos">
							<Header title="GQ Todos" addTodo={this.actions.addGQTodo} type="graphql"/>
							<TodoList type="graphql" todos={this.state.GQTodos} actions={this.actions} />
						</div>
					</div>
				</div>
				<div>
					<div className="todo-console">
						<Console logs={this.state.logs} variant="light" />
					</div>
				</div>
			</div>
		);
	}
}

export default App;
