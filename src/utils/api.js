const createHeading = 'color: #49CC90; font-weight: bold; font-size: 25px';
const createResponse = 'font-weight: bold';

const readHeading = 'color: #61AFFE; font-weight: bold; font-size: 25px';
const readResponse = 'font-weight: bold';

const updateHeading = 'color: #F6A130; font-weight: bold; font-size: 25px';
const updateResponse = 'font-weight: bold';

const deleteHeading = 'color: #F33F3E; font-weight: bold; font-size: 25px';
const deleteResponse = 'font-weight: bold';

// CREATE
const addRestTodo = async (todo) => {
  const stringifiedBody = JSON.stringify(todo);

  console.log('%cAdding REST Todo', createHeading);
  console.log('%cPATH /api/rest/v2/keyspaces/todos/rest using METHOD POST', createResponse)
  console.log("%cWith the following BODY = ", createResponse)
  console.log("%c\t%s", createResponse, stringifiedBody)

  const response = await fetch("/.netlify/functions/createRestTodo", {
    body: stringifiedBody,
    method: "POST",
  });

  console.log('%cResponse from Adding REST Todo', createResponse);
  console.log(response)

  return response;
};

// READ
const getRestTodos = async () => {
  console.log('%cGetting REST Todos', readHeading);
  console.log('%cPATH /api/rest/v2/keyspaces/todos/rest?where={"key":{"$eq":"rest"}} using METHOD GET', readResponse);

  const response = await fetch(`/.netlify/functions/getRestTodos`);
  let todos = await response.json();

  console.log('%cResponse from Getting Rest Todos', readResponse);
  console.table(todos)

  //return todos.length ? todos : [];
  return todos;
};

// UPDATE
const updateRestTodo = async (todo) => {
  const stringifiedBody = JSON.stringify(todo);

  console.log('%cUpdating REST Todo', updateHeading);
  console.log('%cPATH /api/rest/v2/keyspaces/todos/rest/{todo.id} using METHOD PUT', updateResponse)
  console.log("%cWith the following BODY = ", createResponse)
  console.log("%c\t%s", createResponse, stringifiedBody)

  const response = await fetch("/.netlify/functions/updateRestTodo", {
    body: stringifiedBody,
    method: "PUT",
  });

  console.log('%cResponse from Updating REST Todo', updateResponse);
  let responsejson = await response.json();
  console.log(responsejson)

  return responsejson;
};

// DELETE
const deleteRestTodo = async (id) => {
  const stringifiedBody = JSON.stringify({ id });

  console.log('%cDeleting REST Todo', deleteHeading);
  console.log('%cPATH /api/rest/v2/keyspaces/todos/rest using METHOD DELETE', deleteResponse)
  console.log("%cWith the following BODY = ", createResponse)
  console.log("%c\t%s", createResponse, stringifiedBody)

  const response = await fetch("/.netlify/functions/deleteRestTodo", {
    body: stringifiedBody,
    method: "DELETE",
  });

  console.log('%cResponse from Deleting REST Todo', deleteResponse);
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
