const { getCollection } = require("./utils/astraClient");

exports.handler = async (event, context) => {
  const body = JSON.parse(event.body);
  const todos = await getCollection();
  try {
    const res = await todos.delete(body.id);
    return {
      statusCode: 204,
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
