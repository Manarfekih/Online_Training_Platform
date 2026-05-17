const express = require("express");
const { graphqlHTTP } = require("express-graphql");

const getGraphQLSchema = require("./schema");
const resolvers = require("./resolvers");

const router = express.Router();

function setupGraphQL() {
  const schema = getGraphQLSchema();

  router.use(
    "/graphql",
    graphqlHTTP({
      schema,
      rootValue: resolvers,
      graphiql: true
    })
  );

  return router;
}

module.exports = setupGraphQL;
