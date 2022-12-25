import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import "antd/dist/antd.css";
import { ChatProvider } from "./containers/hooks/useChat";
import { split } from 'apollo-link';
import { WebSocketLink } from 'apollo-link-ws';
import { getMainDefinition } from 'apollo-utilities';
import { createClient } from 'graphql-ws';
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  HttpLink,
} from '@apollo/client';
import { GraphQLWsLink } from '@apollo/client/link/subscriptions';
const root = ReactDOM.createRoot(document.getElementById("root"));
const httpLink = new HttpLink({
  uri: 'http://localhost:5000/',
});
// Create a WebSocket link:
// const wsLink = new WebSocketLink({
//   uri: `ws://localhost:5000/`,
//   options: { reconnect: true },
// });
const wsLink = new GraphQLWsLink(createClient({
  url: 'ws://localhost:5000/subscriptions',
  options: {
  lazy: true,
  },
 }));
const splitLink = split(
  ({ query }) => {
  const definition = getMainDefinition(query);
  return (
  definition.kind === 'OperationDefinition' &&
  definition.operation === 'subscription'
  );
  },
  wsLink,
  httpLink,
 );
const link = split(
  // split based on operation type
  ({ query }) => {
    const definition = getMainDefinition(query);
    return (
      definition.kind === 'OperationDefinition' &&
      definition.operation === 'subscription'
    );
  },
  wsLink,
  httpLink,
);
const client = new ApolloClient({
  link: splitLink,
  cache: new InMemoryCache(),
 });
root.render(
  <React.StrictMode>
    
      <ApolloProvider client={client}>
        <ChatProvider><App /></ChatProvider>
      </ApolloProvider>
    
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
