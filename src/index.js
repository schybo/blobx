import ApolloClient from "apollo-boost";
import { ApolloProvider } from "@apollo/react-hooks";
import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import Home from "./Home";
import * as serviceWorker from "./serviceWorker";

// How do I make this different per env...?
const client = new ApolloClient({
  uri: "http://localhost:4000"
});

const App = () => (
  <ApolloProvider client={client}>
    <Home></Home>
  </ApolloProvider>
);

ReactDOM.render(<App />, document.getElementById("root"));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
