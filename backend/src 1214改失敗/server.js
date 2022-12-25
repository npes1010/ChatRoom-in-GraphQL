import { GraphQLServer, PubSub } from 'graphql-yoga'
const fs = require('fs');
import { createPubSub, createSchema, createYoga } from 'graphql-yoga'
// import db from './db';
import { ChatBoxModel } from './models/chatbox'
import Query from './resolvers/Query';
import Mutation from './resolvers/Mutation';
import Subscription from './resolvers/Subscription';
import User from './resolvers/User';
import Post from './resolvers/Post';
import Comment from './resolvers/Comment';
import db from '../mongo'/////我家的
import { useServer } from 'graphql-ws/lib/use/ws'
const pubsub = new PubSub();
import { createServer } from 'node:http'
import { fstat } from 'node:fs';
// const httpServer = createServer(yoga)
// const wsServer = new WebSocketServer({
//  server: httpServer,
//  path: yoga.graphqlEndpoint,
// })

// const server = new GraphQLServer({
//   typeDefs: './src/schema.graphql',
//   resolvers: {
//     Query,
//     Mutation,
//     Subscription,
//     // User,
//     // Post,
//     // Comment,
//   },
//   context: {
//     db,
//     pubsub,
//   },
// });

const yoga = createYoga({
  schema: createSchema({
    typeDefs: fs.readFileSync('./src/schema.graphql'),
    resolvers: {
      Query,
      Mutation,
      Subscription,
    },
  }),
  context: {
    ChatBoxModel,
    pubsub,
  },
  graphiql: {
    subscriptionsProtocol: 'WS',
  }
});


// const server = createServer(yoga)
// server.listen({ port: process.env.PORT | 5000 }, () => {
//   console.log(`The server is up on port ${process.env.PORT | 5000}!`);
// });
// 直接 "export default server"
export default server