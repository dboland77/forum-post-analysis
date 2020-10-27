// import React from "react";
// import { render } from "react-dom";

// import App from "./App";

// import {
//   ApolloClient,
//   ApolloProvider,
//   InMemoryCache,
// } from "@apollo/client";

// //Posts
// const client = new ApolloClient({
//   uri: "https://fakerql.nplan.io/graphql",
//   cache: new InMemoryCache(),
// });

// render(
//   <ApolloProvider client={client}>
//     <App />
//   </ApolloProvider>,
//   document.getElementById("root")
// );

import React from "react";
import { render } from "react-dom";
import ParentSize from "@visx/responsive/lib/components/ParentSize";

import Example from "./Axis.js";
import "./sandbox-styles.css";

render(
  <ParentSize>
    {({ width, height }) => <Example width={width} height={height} />}
  </ParentSize>,
  document.getElementById("root")
);
