const { GraphQLServer } = require('graphql-yoga');

let links = [
  {
    id: 'link-0',
    url: 'www.howtographql.com',
    description: 'Full Stack tutorial for GraphQL'
  }
];
let idCount = links.length;
const resolvers = {
  Query: {
    info: () => `This is the GraphQL API of a Hackernews clone`,
    feed: () => links
  },
  Mutation: {
    post: (parent, args) => {
      const link = {
        id: `link-${idCount++}`,
        description: args.description,
        url: args.url
      }
      links.push(link)
      return link
    }
  }
};

const server = new GraphQLServer({
  typeDefs: './schema/index.graphql',
  resolvers
});
server.start(() => console.log(`Server is 🏃‍ on http://localhost:4000`));
