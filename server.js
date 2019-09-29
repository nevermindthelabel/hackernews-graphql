const { GraphQLServer } = require('graphql-yoga');

const typeDefs = `
  type Query {
    info: String!
    feed: [Link!]
  }
  type Link {
    id: ID!
    description: String!
    url: String!
  }
  type Mutation {
    post(url: String!, description: String!): Link!
  }
`;

let links = [
  {
    id: 'link-0',
    url: 'www.howtographql.com',
    description: 'Full Stack tutorial for GraphQL'
  }
];

const resolvers = {
  Query: {
    info: () => `This is the GraphQL API of a Hackernews clone`,
    feed: () => links
  },
  Link: {
    id: parent => parent.id,
    description: parent => parent.description,
    url: parent => parent.url
  }
};

const server = new GraphQLServer({
  typeDefs,
  resolvers
});
server.start(() => console.log(`Server is 🏃‍ on http://localhost:4000`));
