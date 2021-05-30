const { ApolloServer } = require('apollo-server');
const fs = require('fs');
const path = require('path');

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
    info: () => `This is the API of a Hackernews Clone`,
    feed: () => links,
    link: (parent, args) => {
      const theLink = {
        id: `link-${args.id}`,
        description: links[args.id].description,
        url: links[args.id].url
      };
      return theLink;
    }
  },
  Mutation: {
    post: (parent, args) => {
      const link = {
        id: `link-${idCount++}`,
        description: args.description,
        url: args.url
      };
      links.push(link);
      return link;
    }
  }
};

const server = new ApolloServer({
  typeDefs: fs.readFileSync(path.join(__dirname, 'schema.graphql'), 'utf8'),
  resolvers
});

server.listen().then(({ url }) => console.log(`Server is running on ${url}`));
