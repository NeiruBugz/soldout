import React, { Component } from "react";
import { Route, Router } from "react-router";
import { Provider } from "react-redux";
import { createBrowserHistory } from "history";
import "./App.scss";
import GameField from "./layouts/GameField";
import Landing from "./layouts/Landing";
import store from "./store/store";

const history = createBrowserHistory();

class App extends Component {
  constructor (props) {
    super(props);
    this.props = props;
  }

  render () {
    return (
      <Provider store={store}>
        <Router history={history}>
          <Route exact component={Landing} path="/" />
          <Route component={GameField} path="/game" />
        </Router>
      </Provider>
    );
  }
}

export default App;
