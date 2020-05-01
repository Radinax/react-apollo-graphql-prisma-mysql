const { GraphQLServer } = require('graphql-yoga')
const { prisma } = require('./generated/prisma-client')
// Resolvers
const Query = require('./resolvers/Query')
const Mutation = require('./resolvers/Mutation')
const User = require('./resolvers/User')
const Link = require('./resolvers/Link')
const Subscription = require('./resolvers/Subscription')

const resolvers = {
  Query,
  Mutation,
  User,
  Link,
  Subscription
}

/*
const resolvers = {
  Query: {
    info: () => `This is the API of a Hackernews Clone`,
    feed: (root, args, context, info) => {
      return context.prisma.links()
    }
  },
  Mutation: {
    post: (root, args, context) => {
      return context.prisma.createLink({
        url: args.url,
        description: args.description
      })
    }
  }
}
*/

const corsOptions = {
  origin: "*",
  credentials: true,
  allowedHeaders: ['Content-Type', 'Authorization']
};

const server = new GraphQLServer({
  typeDefs: './src/schema.graphql',
  resolvers,
  context: request => {
    return {
      ...request,
      prisma,
    }
  }
})

const options = {
  cors: corsOptions
};

server.start(options, () => console.log('Server running at https://localhost:4000'))
