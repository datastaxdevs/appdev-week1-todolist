const getRestTodos = async () => {
  console.log('%cGetting Rest Todos', 'color: green; font-family: arial; font-weight: bold; font-size: large');
  console.log('%c    REST: GET /api/rest/v2/keyspaces/todos/rest?where={"key":{"$eq":"rest"}}', 'color: green; font-family: arial');
  const response = await fetch(`/.netlify/functions/getRestTodos`);
  let todos = await response.json();
  console.log('%cResponse from Getting Rest Todos', 'color: green; font-family: arial');
  
  console.table(todos)
  return todos.length ? todos : [];
};

const addRestTodo = async (todo) => {
  
  
  console.log('%cAdding Rest Todo', 'color: green; font-family: arial; font-weight: bold; font-size: large');
  console.log('%c    REST POST /api/rest/v2/keyspaces/todos/rest/', 'color: green; font-family: arial')

  const response = await fetch("/.netlify/functions/createRestTodo", {
    body: JSON.stringify(todo),
    method: "POST",
  });
  console.log('%cResponse from Adding REST Todo', 'color: green; font-family: arial');
  console.log(response)

  return response;
};

const updateRestTodo = async (todo) => {
  
  
  console.log('%cUpdating Rest Todo', 'color: green; font-family: arial; font-weight: bold; font-size: large');
  console.log('%c    REST PUT /api/rest/v2/keyspaces/todos/rest/{todo.id}', 'color: green; font-family: arial')

  const response = await fetch("/.netlify/functions/updateRestTodo", {
    body: JSON.stringify(todo),
    method: "PUT",
  });
  console.log('%cResponse from Updating REST Todo', 'color: green; font-family: arial');
  let responsejson = await response.json();
  console.log(responsejson)

  return responsejson;
};

const deleteRestTodo = async (id) => {
  
  
  console.log('%cDeleting Rest Todo', 'color: green; font-family: arial; font-weight: bold; font-size: large');
  console.log('%c    REST DELETE /api/rest/v2/keyspaces/todos/rest/{todo.id}', 'color: green; font-family: arial')

  const response = await fetch("/.netlify/functions/deleteRestTodo", {
    body: JSON.stringify({ id }),
    method: "POST",
  });
  console.log('%cResponse from Deleting REST Todo', 'color: green; font-family: arial');
  console.log(response)

  return response;
};

const default_export = {
  getRestTodos,
  addRestTodo,
  deleteRestTodo,
  updateRestTodo
};
export default default_export;
