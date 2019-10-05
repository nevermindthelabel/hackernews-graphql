const { GraphQLServer } = require('graphql-yoga');
const { prisma } = require('./prisma-client');

const Query = require('./resolvers/Query');
const Mutation = require('./resolvers/Mutations');
const User = require('./resolvers/User');
const Link = require('./resolvers/Link');
const Subscription = require('./resolvers/Subscription');

const resolvers = {
  Query,
  Mutation,
  Subscription,
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
