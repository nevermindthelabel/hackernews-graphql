const { ApolloServer } = require('apollo-server');
const { PrismaClient } = require('@prisma/client');
const fs = require('fs');
const path = require('path');

const prisma = new PrismaClient();

const resolvers = {
  Query: {
    info: () => `This is the API of a Hackernews Clone`,
    feed: async (parent, args, context) => {
      return context.prisma.link.findMany();
    },
    link: (parent, args, context, info) => {
      console.log(context.prisma.link);
      const theLink = {
        id: `${args.id}`,
        description: context.prisma.link.findUnique(
          args => args.id === context.id
        )
        // url: context.prisma.link[args.id].url
      };
      return theLink;
    }
  },
  Mutation: {
    post: (parent, args, context, info) => {
      const newLink = context.prisma.link.create({
        data: {
          url: args.url,
          description: args.description
        }
      });
      return newLink;
    }
  }
};

const server = new ApolloServer({
  typeDefs: fs.readFileSync(path.join(__dirname, 'schema.graphql'), 'utf8'),
  resolvers,
  context: {
    prisma
  }
});

server.listen().then(({ url }) => console.log(`Server is running on ${url}`));
