const { getCollection, getRestClient } = require("./utils/astraClient");
exports.handler = async (event, context) => {
  const todos = await getCollection();
  const body = JSON.parse(event.body);

  try {
    const res = await todos.create(body.id, body)
    return {
      statusCode: 201,
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
