const { GraphQLServer } = require('graphql-yoga');
const { prisma } = require('./prisma-client');

const resolvers = {
  Query: {
    info: () => `This is the GraphQL API of a Hackernews clone`,
    feed: (root, args, context, info) => {
      return context.prisma.links();
    }
  },
  Mutation: {
    post: (root, args, context) => {
      return context.prisma.createdLink({
        url: args.url,
        description: args.description
      });
    },
  },
};

const server = new GraphQLServer({
  typeDefs: './schema/index.graphql',
  resolvers,
  context: { prisma }
});

server.start(() => console.log(`Server is 🏃‍ on http://localhost:4000`));
