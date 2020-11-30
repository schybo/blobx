import "./index.css";

import * as serviceWorker from "./serviceWorker";

import { BrowserRouter, Route, Switch } from 'react-router-dom'

import ApolloClient from "apollo-boost";
import { ApolloProvider } from "@apollo/react-hooks";
import PersistentDrawerLeft from './components/PersistentDrawerLeft'
import Home from "./Home";
import Login from "./components/Login";
import Create from "./components/Create";
import React from "react";
import ReactDOM from "react-dom";

// How do I make this different per env...?
const client = new ApolloClient({
  uri: "http://localhost:4000",
  request: (operation) => {
    const token = localStorage.getItem('x-token')
    if (token) {
      operation.setContext({
        headers: {
          "x-token": `${token}`
        }
      })
    }
  }
});

const App = () => (
  <BrowserRouter>
    <ApolloProvider client={client}>
      <PersistentDrawerLeft>
        <div className="ph3 pv1 background-gray">
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/create" component={Create} />
            <Route exact path="/login" component={Login} />
          </Switch>
        </div>
      </PersistentDrawerLeft>
    </ApolloProvider>
  </BrowserRouter>
);

ReactDOM.render(<App />, document.getElementById("root"));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
