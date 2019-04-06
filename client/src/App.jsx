import React, { Component } from "react";
import { Route, Router } from "react-router";
import { createBrowserHistory } from "history";
import "./App.scss";
import GameField from "./layouts/GameField";
import Landing from "./layouts/Landing";

const history = createBrowserHistory();

class App extends Component {
  constructor (props) {
    super(props);
    this.props = props;
  }

  render () {
    return (
      <Router history={history}>
        <Route exact component={Landing} path="/"/>
        <Route component={GameField} path="/game"/>
      </Router>
    );
  }
}

export default App;
