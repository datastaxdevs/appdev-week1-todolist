const { getRestClient } = require("./utils/astraRestClient");

exports.handler = async (event, context) => {
  const todos = await getRestClient();
  let body = JSON.parse(event.body);

  try {
    let path = '/api/rest/v2/keyspaces/todos/rest/' + body.id;
    body = {"text":body.text, "completed":body.completed}
    const res = await todos.put(path, body);
    return {
      statusCode: res.status,
      body: JSON.stringify(res),
      headers: {
        'Content-Type': 'application/json'
      },
    };
  } catch (e) {
    return {
      statusCode: 400,
      body: JSON.stringify(e),
    };
  }
};
