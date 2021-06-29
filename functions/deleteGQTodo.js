const { getRestClient } = require("./utils/astraRestClient");
let client = null;
exports.handler = async (event, context) => {
  if (!client) {
    client = await getClient();
  }
  const body = JSON.parse(event.body);

  let query = `mutation deletegraphql {
    graphql: deletegraphql(value: {
      id: "${body.id}"
  }) {value { text } }}`
  let res = await client.post('/api/graphql/todos',
    {query: query})

  console.log(res)
  if (res.status == 204) {
    return {
        statusCode: res.status,
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

async function getClient() {
  let client = await getRestClient();
  if (client === null) {
    wait(1000)
    return getClient()
  }
  return client
}
