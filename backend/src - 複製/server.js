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

const pubsub = new PubSub();
import { createServer } from 'node:http'
import { fstat } from 'node:fs';

const server = new GraphQLServer({
  typeDefs: './src/schema.graphql',
  resolvers: {
    Query,
    Mutation,
    Subscription,
    // User,
    // Post,
    // Comment,
  },
  context: {
    db,
    pubsub,
  },
});

// const yoga = createYoga({
//   schema: createSchema({
//     typeDefs: fs.readFileSync(
//       './src/schema.graphql',
//       'utf-8'
//     ),
//     resolvers: {
//       Query,
//       Mutation,
//       Subscription,
//       // User,
//       // Post,
//       // Comment,
//     },
//   }),
//   context: {
//     ChatBoxModel,
//     db,
//     pubsub,
//   },
//   graphqlEndpoint: '/',

// });


// const server = createServer(yoga)
// server.listen({ port: process.env.PORT | 5000 }, () => {
//   console.log(`The server is up on port ${process.env.PORT | 5000}!`);
// });
// 直接 "export default server"
export default server