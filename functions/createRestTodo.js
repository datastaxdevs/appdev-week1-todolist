const { getRestClient } = require("./utils/astraRestClient");
exports.handler = async (event, context) => {
  const todos = await getRestClient();
  const body = JSON.parse(event.body);
  event.body.key = "todo"
  
  const res = await todos.post('/api/rest/v2/keyspaces/todos/rest', event.body);
  if (res.status == 201) {
    return {
        statusCode: res.status,
        body: JSON.stringify(res.data),
        headers: {
          'Content-Type': 'application/json'
        },
    }
  } else {
    return {
      statusCode: res.status,
      body: JSON.stringify(res.data)
    }
  }
};
