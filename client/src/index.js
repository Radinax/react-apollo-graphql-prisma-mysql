import React from "react";
import { render } from "react-dom";
import { ApolloClient } from 'apollo-client'
import { ApolloProvider } from 'react-apollo';
import { createHttpLink } from 'apollo-link-http'
import { InMemoryCache } from 'apollo-cache-inmemory'
import App from "./App";
import * as serviceWorker from './serviceWorker';

const httpLink = createHttpLink({
  // uri: 'https://eu1.prisma.sh/adrian-beria-e1d9b7/links/dev'
  uri: 'http://localhost:4000/'
})

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: httpLink
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
