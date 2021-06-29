const createHeadingStyle = 'color: #49CC90; font-weight: bold; font-size: 25px';
const readHeadingStyle = 'color: #61AFFE; font-weight: bold; font-size: 25px';
const updateHeadingStyle = 'color: #F6A130; font-weight: bold; font-size: 25px';
const deleteHeadingStyle = 'color: #F33F3E; font-weight: bold; font-size: 25px';
const responseStyle = 'font-weight: bold';

// CREATE
const addRestTodo = async (todo) => {
  const stringifiedBody = JSON.stringify(todo);

  console.log('%cAdding REST Todo', createHeadingStyle);
  console.log('%cPATH /api/rest/v2/keyspaces/todos/rest using METHOD POST', responseStyle)
  console.log("%cWith the following BODY = ", responseStyle)
  console.log("%c\t%s", responseStyle, stringifiedBody)

  const response = await fetch("/.netlify/functions/createRestTodo", {
    body: stringifiedBody,
    method: "POST",
  });

  console.log('%cResponse from Adding REST Todo', responseStyle);
  console.log(response)

  return response;
};

// READ
const getRestTodos = async () => {
  console.log('%cGetting REST Todos', readHeadingStyle);
  console.log('%cPATH /api/rest/v2/keyspaces/todos/rest?where={"key":{"$eq":"rest"}} using METHOD GET', responseStyle);

  const response = await fetch(`/.netlify/functions/getRestTodos`);
  let todos = await response.json();

  console.log('%cResponse from Getting Rest Todos', responseStyle);
  console.table(todos)

  return todos.length ? todos : [];
};

// UPDATE
const updateRestTodo = async (todo) => {
  const stringifiedBody = JSON.stringify(todo);

  console.log('%cUpdating REST Todo', updateHeadingStyle);
  console.log('%cPATH /api/rest/v2/keyspaces/todos/rest using METHOD PUT', responseStyle)
  console.log("%cWith the following BODY = ", responseStyle)
  console.log("%c\t%s", responseStyle, stringifiedBody)

  const response = await fetch("/.netlify/functions/updateRestTodo", {
    body: stringifiedBody,
    method: "PUT",
  });

  console.log('%cResponse from Updating REST Todo', responseStyle);
  let responsejson = await response.json();
  console.log(responsejson)

  return responsejson;
};

// DELETE
const deleteRestTodo = async (id) => {
  const stringifiedBody = JSON.stringify({ id });

  console.log('%cDeleting REST Todo', deleteHeadingStyle);
  console.log('%cPATH /api/rest/v2/keyspaces/todos/rest using METHOD DELETE', responseStyle)
  console.log("%cWith the following BODY = ", responseStyle)
  console.log("%c\t%s", responseStyle, stringifiedBody)

  const response = await fetch("/.netlify/functions/deleteRestTodo", {
    body: stringifiedBody,
    method: "DELETE",
  });

  console.log('%cResponse from Deleting REST Todo', responseStyle);
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
