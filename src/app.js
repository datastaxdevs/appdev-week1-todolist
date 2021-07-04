import React, { useEffect } from 'react';
import Header from './Header';
import TodoList from './TodoList';
import api from './utils/api';
import uuid from 'node-uuid';
import { Hook, Unhook, Console } from 'console-feed';
import ScrollToBottom from 'react-scroll-to-bottom';

function App() {
	const [restTodos, setRestTodos] = React.useState([]);
	const [logs, setLogs] = React.useState([]);

	const addRestTodo = async (text) => {
		await api.addRestTodo({
			id: uuid.v1(),
			completed: false,
			text: text,
			key: 'rest',
		});

    	getRestTodos();
	};

	const deleteRestTodo = async (id) => {
		await api.deleteRestTodo(id);
		getRestTodos();
	};

	const completeRestTodo = async (id, text, completed) => {
		await api.updateRestTodo({
			id,
			text,
			completed: !completed,
		});

		getRestTodos();
	};

	useEffect(() => {
		Hook(
			window.console, 
			(log) => setLogs((currLogs) => [...currLogs, log]),
			false
		);
		getRestTodos();

		return () => Unhook(window.console);
	}, []);

	useEffect(() => {
		console.log("STATE Change:", restTodos)
	}, [restTodos]);

	const getRestTodos = async () => {
		// Reload the todo list from the database to see the latest changes
		api.getRestTodos().then((restTodos) => setRestTodos( restTodos ));
	};

	const clearRestCompleted = async () => {
		let docTodos = api.getRestTodos();
		docTodos.forEach((todo) => {
			completeRestTodo(todo.id, todo.text, true);
		});
	};

	const actions = {
		addRestTodo: addRestTodo,
		completeRestTodo: completeRestTodo,
		clearRestCompleted: clearRestCompleted,
		getRestTodos: getRestTodos,
		deleteRestTodo: deleteRestTodo,
	};

	return (
		<div>
		<div>
			<div>
				<div className="todos">
					<Header title="REST todos" addTodo={actions.addRestTodo}  type="rest"/>
					<TodoList type="rest" todos={restTodos} actions={actions} />
				</div>
			</div>
		</div>
		<div>
			<ScrollToBottom className="todo-console">
				<Console logs={logs} variant="dark" />
			</ScrollToBottom>
		</div>
	</div>
	);
}

export default App;