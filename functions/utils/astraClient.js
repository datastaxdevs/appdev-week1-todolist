const { createClient } = require("@astrajs/collections");

let astraClient = null;

const getAstraDocClient = async () => {
  if (astraClient === null) {
    astraClient = await createClient(
      {
        astraDatabaseId: process.env.ASTRA_DB_ID,
        astraDatabaseRegion: process.env.ASTRA_DB_REGION,
        applicationToken: process.env.ASTRA_DB_APPLICATION_TOKEN,
      },
      30000
    );
  }
  return astraClient;
};


async function getCollection() {
  const documentClient = await getAstraDocClient();
  return documentClient
    .namespace('todos')
    .collection("doc");
};

module.exports = { getCollection };
