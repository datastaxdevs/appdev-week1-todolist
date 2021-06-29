const { getRestClient, requestWithRetry, wait, astraRestClient } = require("./utils/astraRestClient");
let client = astraRestClient
exports.handler = async (event, context) => {
  if (!client) {
    client = await getClient();
  }
  let query = `query GQTodos {
    graphql (value: {key:"graphql"}) {
      values {
        id
        text
        completed
        key
      }
    }}`
    

  try {
    res = await client.post('/api/graphql/todos', query={query})
    const formattedTodos = Object.keys(res.data.graphql.values).map((item) => res.data.graphql.values[item]);
    return {
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
