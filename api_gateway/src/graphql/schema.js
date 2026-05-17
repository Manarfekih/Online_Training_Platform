const fs = require("fs");
const path = require("path");
const { buildSchema } = require("graphql");

function getGraphQLSchema() {
  const schemaPath = path.join(__dirname, 'schema.gql');
  
  try {
    const schemaString = fs.readFileSync(schemaPath, { encoding: "utf8" });
    return buildSchema(schemaString);
  } catch (error) {
    console.error("Error reading the schema file:", error);
    throw error;
  }
}

module.exports = getGraphQLSchema;
