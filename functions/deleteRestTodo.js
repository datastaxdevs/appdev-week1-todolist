const { getRestClient } = require("./utils/astraRestClient");

exports.handler = async (event, context) => {
  const body = JSON.parse(event.body);
  const client = await getRestClient();
  try {
    let delete_path = '/api/rest/v2/keyspaces/todos/rest/' + body.id
    const res = await client.delete(delete_path);
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
