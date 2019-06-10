const { ApolloServer } = require('apollo-server');

const { typeDefs, resolvers } = require('./schema');

const PORT = 4000;

const server = new ApolloServer({
  typeDefs,
  resolvers,
  cors: true
});

server.listen(PORT).then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
});
