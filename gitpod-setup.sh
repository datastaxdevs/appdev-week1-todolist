#!/bin/bash

function setupTable() {
  if [[ -z "$ASTRA_DB_APPLICATION_TOKEN" ]]; then
    echo "What is your Astra DB App Token? 🚀"
    read -r ASTRA_DB_APPLICATION_TOKEN
    export ASTRA_DB_APPLICATION_TOKEN="${ASTRA_DB_APPLICATION_TOKEN// /}"
    gp env ASTRA_DB_APPLICATION_TOKEN="${ASTRA_DB_APPLICATION_TOKEN// /}" &>/dev/null
  fi

  if [[ -z "$ASTRA_DB_KEYSPACE" ]]; then
    echo "What is your Astra keyspace name? 🔑"
    read -r ASTRA_DB_KEYSPACE
    export ASTRA_DB_KEYSPACE="${ASTRA_DB_KEYSPACE// /}"
    gp env ASTRA_DB_KEYSPACE="${ASTRA_DB_KEYSPACE// /}" &>/dev/null
  fi

  if [[ -z "$ASTRA_DB_ID" ]]; then
    echo "What is your Astra database id? Example: 4e62bc79-0e12-4667-bd7d-2191ece2a32c ☁️"
    read -r ASTRA_DB_ID
    export ASTRA_DB_ID="${ASTRA_DB_ID// /}"
    gp env ASTRA_DB_ID="${ASTRA_DB_ID// /}" &>/dev/null
  fi

  if [[ -z "$ASTRA_DB_REGION" ]]; then
    echo "What is your Astra database region? Example: us-east1 🌍"
    read -r ASTRA_DB_REGION
    export ASTRA_DB_REGION="${ASTRA_DB_REGION// /}"
    gp env ASTRA_DB_REGION="${ASTRA_DB_REGION// /}" &>/dev/null
  fi

  # Create todos table
  echo "Creating Astra tables..."
  TABLE_CREATION=$(curl --request POST \
    --url "https://${ASTRA_DB_ID}-${ASTRA_DB_REGION}.apps.astra.datastax.com/api/rest/v1/keyspaces/${ASTRA_DB_KEYSPACE}/tables" \
    --header 'content-type: application/json' \
    --header "x-cassandra-token: ${ASTRA_DB_APPLICATION_TOKEN}" \
    --data '{"ifNotExists":true,"columnDefinitions":[{"static":false,"name":"list_id","typeDefinition":"text"},{"static":false,"name":"id","typeDefinition":"timeuuid"},{"static":false,"name":"title","typeDefinition":"text"},{"static":false,"name":"completed","typeDefinition":"boolean"}],"primaryKey":{"partitionKey":["list_id","id"]},"tableOptions":{"defaultTimeToLive":0,"clusteringExpression":[{"column":"id","order":"DESC"}]},"name":"jamstack_todos"}')
}

setupTable
echo $TABLE_CREATION

while [ ! "$TABLE_CREATION" = '{"success":true}' ]; do
  echo "Your Database details were invalid. Trying again:"
  unset ASTRA_DB_ID
  unset ASTRA_DB_REGION
  unset ASTRA_DB_KEYSPACE
  unset ASTRA_DB_APPLICATION_TOKEN
  setupTable
done
