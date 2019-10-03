const { GraphQLServer } = require('graphql-yoga');
const { prisma } = require('./prisma-client');

const Query = require('./resolvers/Query');
const Mutation = require('./resolvers/Mutations');
const User = require('./resolvers/User');
const Link = require('./resolvers/Link');

const resolvers = {
  Query,
  Mutation,
  User,
  Link
};

const server = new GraphQLServer({
  typeDefs: './schema/index.graphql',
  resolvers,
  context: request => {
    return {
      ...request,
      prisma
    };
  }
});

server.start(() => console.log(`Server is 🏃‍ on http://localhost:4000`));
