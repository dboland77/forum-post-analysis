import React from "react";
import { render } from "react-dom";
import App from "./App";
import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import Layout from "../src/components/Layout"
//Posts
const client = new ApolloClient({
  uri: "https://fakerql.nplan.io/graphql",
  cache: new InMemoryCache(),
});

render(
  <ApolloProvider client={client}>
  <Layout>
  <h1>Top 3 Monthly Topics</h1>
    <App />
  </Layout>
  </ApolloProvider>,
  document.getElementById("root")
);