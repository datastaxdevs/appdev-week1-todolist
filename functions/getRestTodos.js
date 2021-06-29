const { getRestClient, requestWithRetry, wait } = require("./utils/astraRestClient");

exports.handler = async (event, context) => {
  const client = await getClient();
  let res;
  try {
    res = await client.get('/api/rest/v2/keyspaces/todos/rest?where=\{"key":\{"$eq":\"rest"\}\}')
    const formattedTodos = Object.keys(res.data).map((item) => res.data[item]);
    return {
      headers: '{Content-Type: application/json}',
      statusCode: 200,
      body: JSON.stringify(formattedTodos),
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

async function getClient() {
  let client = await getRestClient();
  if (client === null) {
    wait(1000)
    return getClient()
  }
  return client
}