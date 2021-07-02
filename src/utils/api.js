// CREATE
const addRestTodo = async (todo) => {
  const stringifiedBody = JSON.stringify(todo);
  const response = await fetch("/.netlify/functions/createRestTodo", {
    body: stringifiedBody,
    method: "POST",
  });

  return response;
};

// READ
const getRestTodos = async () => {
  const response = await fetch(`/.netlify/functions/getRestTodos`);
  let todos = await response.json();

  return todos.length ? todos : [];
};

// UPDATE
const updateRestTodo = async (todo) => {
  const stringifiedBody = JSON.stringify(todo);
  const response = await fetch("/.netlify/functions/updateRestTodo", {
    body: stringifiedBody,
    method: "PUT",
  });

  let responsejson = await response.json();
  return responsejson;
};

// DELETE
const deleteRestTodo = async (id) => {
  const stringifiedBody = JSON.stringify({ id });
  const response = await fetch("/.netlify/functions/deleteRestTodo", {
    body: stringifiedBody,
    method: "DELETE",
  });

  return response;
};

const default_export = {
  getRestTodos,
  addRestTodo,
  deleteRestTodo,
  updateRestTodo
};

export default default_export;
