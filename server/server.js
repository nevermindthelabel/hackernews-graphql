const { ApolloServer } = require('apollo-server');
const { PrismaClient } = require('@prisma/client');
const { getUserId } = require('./util/util.js');
const Query = require('./resolvers/Query.js');
const Mutation = require('./resolvers/Mutation.js');
const User = require('./resolvers/User');
const Link = require('./resolvers/Link.js');
const fs = require('fs');
const path = require('path');

const prisma = new PrismaClient();

const resolvers = {
  Query,
  Mutation,
  User,
  Link
};

const server = new ApolloServer({
  typeDefs: fs.readFileSync(path.join(__dirname, 'schema.graphql'), 'utf8'),
  resolvers,
  context: ({ req }) => {
    return {
      ...req,
      prisma,
      userId: req && req.headers.authorization ? getUserId(req) : null
    };
  }
});

server.listen().then(({ url }) => console.log(`Server is running on ${url}`));
