import React from "react";
import { render } from "react-dom";
import { ApolloClient } from 'apollo-client'
import { ApolloProvider } from 'react-apollo';
import { createHttpLink } from 'apollo-link-http'
// Subscription libs
// import { split } from 'apollo-link'
// import { WebSocketLink } from 'apollo-link-ws'
// import { getMainDefinition } from 'apollo-utilities'
import { InMemoryCache } from 'apollo-cache-inmemory'
// Token
import { AUTH_TOKEN } from './constants'
import { setContext } from 'apollo-link-context'
// Component
import App from "./App";
import * as serviceWorker from './serviceWorker';

const httpLink = createHttpLink({
  // uri: 'https://eu1.prisma.sh/adrian-beria-e1d9b7/links/dev'
  uri: 'http://localhost:4000/'
})

// Create a WebSocket link:
/*
const wsLink = new WebSocketLink({
  uri: `ws://localhost:4000/`,
  options: {
    reconnect: true,
    connectionParams: {
      authToken: localStorage.getItem(AUTH_TOKEN)
    }
  }
})
*/

// Token workaround
const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem(AUTH_TOKEN)
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  }
})

// This is for making subscriptions to go to the WS while queries/mutations to HTTP
/*
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
  authLink.concat(httpLink),
)
*/

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: authLink.concat(httpLink)
});

render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
