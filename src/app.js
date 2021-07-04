import React, { useEffect } from 'react';
import Header from './Header';
import TodoList from './TodoList';
import api from './utils/api';
import uuid from 'node-uuid';

function App() {
	const [restTodos, setRestTodos] = React.useState([]);

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
		getRestTodos();
		// eslint-disable-next-line react-hooks/exhaustive-deps
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
		<div className="todos">
			<Header title="REST todos" addTodo={actions.addRestTodo}  type="rest"/>
			<TodoList type="rest" todos={restTodos} actions={actions} />
		</div>
	);
}

export default App;
