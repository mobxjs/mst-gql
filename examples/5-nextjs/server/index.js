const { ApolloServer } = require('apollo-server-express');
const { createServer } = require('http');
const express = require('express');
const app = express();
const cors = require('cors');

const { typeDefs, resolvers } = require('./schema');

const PORT = 4000;

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

server.applyMiddleware({ app });

const webServer = createServer(app);

const graphqlEndpoint = `http://localhost:${PORT}${server.graphqlPath}`;

app.use(cors());
app.get(
  '/',
  expressPlayground({
    endpoint: graphqlEndpoint,
    subscriptionEndpoint: subscriptionEndpoint,
  })
);

webServer.listen(PORT, () => {
  console.log(`🚀 Server ready at ${graphqlEndpoint}`);
  console.log(`🚀 Subscriptions ready at ${subscriptionEndpoint}`);
});
