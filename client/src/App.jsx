import React from "react";
import { Route, Router } from "react-router";
import { Provider } from "react-redux";
import { createBrowserHistory } from "history";
import "./App.scss";
import GameField from "./layouts/GameField";
import Landing from "./layouts/Landing";
import store from "./store/store";

const history = createBrowserHistory();

const App = () => (
  <Provider store={store}>
    <Router history={history}>
      <Route exact component={Landing} path="/" />
      <Route component={GameField} path="/game" />
    </Router>
  </Provider>
);

export default App;
