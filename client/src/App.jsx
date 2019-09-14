import React from "react";
import { Route, Router } from "react-router";
import { Provider } from "react-redux";
import { createBrowserHistory } from "history";

import GameField from "./layouts/GameField";
import GameOver from "./components/GameOver";
import Landing from "./layouts/Landing";
import store from "./store/store";
import "./App.scss";

const history = createBrowserHistory();

const App = () => (
  <Provider store={store}>
    <Router history={history}>
      <Route exact component={Landing} path="/" />
      <Route exact component={GameOver} path="/game/over" />
      <Route exact component={GameField} path="/game" />
    </Router>
  </Provider>
);

export default App;
