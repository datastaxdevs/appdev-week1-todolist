const { createClient}= require("@astrajs/rest")
const chalk = require('chalk')
let astraRestClient = null;

const requestWithRetry = async (url, client) => {
  const MAX_RETRIES = 20;
  for (let i = 1; i <= MAX_RETRIES; i++) {
    try {
      let response = await client.get(url);
      return response
    } catch(e) {
      const timeout = 500 * i * 10;
      console.log(chalk.blue('         ... waiting', timeout, 'ms'));
      await wait(timeout);
    }
  }
}

function wait(timeout) {
	return new Promise((resolve) => {
		setTimeout(() => {
			resolve();
		}, timeout);
	});
}

const getAstraRestClient = async () => {
  if (astraRestClient === null) {
    astraRestClient = await createClient(
      {
        astraDatabaseId: process.env.ASTRA_DB_ID,
        astraDatabaseRegion: process.env.ASTRA_DB_REGION,
        applicationToken: process.env.ASTRA_DB_APPLICATION_TOKEN,
        debug: true
      },
      30000
    );
    let tables = await astraRestClient.get('/api/rest/v2/schemas/keyspaces/todos/tables')
    let results = tables.data.filter(entry => entry.name === "rest");
    if (!results.length) {
      await createTable("rest")
    }
    results = tables.data.filter(entry => entry.name === "graphql");
    if (!results.length) {
      await createTable("graphql")
    }
  }
  return astraRestClient;
};

async function createTable(name) {
  if (name == "rest") {
    let response = await astraRestClient.post('/api/rest/v2/schemas/keyspaces/todos/tables',
    {
      "name": "rest",
      "ifNotExists": true,
      "columnDefinitions": [
        {
          "name": "id",
          "typeDefinition": "uuid",
          "static": false
        },
        {
          "name": "text",
          "typeDefinition": "text",
          "static": false
        },
        {
          "name": "key",
          "typeDefinition": "text",
          "static": false
        },
            {
              "name": "completed",
              "typeDefinition": "boolean"
            }
      ],
      "primaryKey": {
        "partitionKey": [
          "id"
        ]
      }
    })
    
    response = await astraRestClient.post('/api/rest/v2/schemas/keyspaces/todos/tables/' + name + '/indexes',
    {
      "column": "key",
      "name": "key_idx",
      "ifNotExists": true
    }
    );
  } else {
    /* 
    let response = await astraRestClient.post('/api/graphql-schema',
    {
      query: 
        `mutation createTables {
          graphql: createTable(
            keyspaceName: "todos", 
            tableName: "graphql", 
            partitionKeys: 
              [{name: "id", type: {basic: UUID}}], 
            clusteringKeys: 
              [{name: "text", type: {basic: TEXT}}],
            values: [
              { name: "completed", type: {basic: INT} },
              { name: "key", type: {basic: TEXT}}
            ]
        )}`
      })

      let tables = await astraRestClient.get('/api/rest/v2/schemas/keyspaces/todos/tables')
      let results = tables.data.filter(entry => entry.name === "gquery");
      if (!results.length) {
        await wait(1000);
      }
      # This all doesn't work yet, have to use REST
      */
      let response = await astraRestClient.post('/api/rest/v2/schemas/keyspaces/todos/tables',
      {
        "name": "graphql",
        "ifNotExists": true,
        "columnDefinitions": [
          {
            "name": "id",
            "typeDefinition": "uuid",
            "static": false
          },
          {
            "name": "text",
            "typeDefinition": "text",
            "static": false
          },
          {
            "name": "key",
            "typeDefinition": "text",
            "static": false
          },
              {
                "name": "completed",
                "typeDefinition": "boolean"
              }
        ],
        "primaryKey": {
          "partitionKey": [
            "id"
          ]
        }
      })

      let tables = await astraRestClient.get('/api/rest/v2/schemas/keyspaces/todos/tables')
      let results = tables.data.filter(entry => entry.name === "graphql");
      if (!results.length) {
        await wait(3000)
      }
      tables = await astraRestClient.get('/api/rest/v2/schemas/keyspaces/todos/tables')
      results = tables.data.filter(entry => entry.name === "graphql");
      if (!results.length) {
        await wait(3000)
      }


    response = await astraRestClient.post('/api/rest/v2/schemas/keyspaces/todos/tables/graphql/indexes',
    {
      "column": "key",
      "name": "key_idx_graphql"
    }
    );
  }
}

const getRestClient = async () => {
  if (astraRestClient === null) {
    const astraRestClient = await getAstraRestClient();
    await wait(1000);
    return astraRestClient;
  };
  return astraRestClient;
}

module.exports = { getRestClient, requestWithRetry, wait, astraRestClient };
