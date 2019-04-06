import React, { Component } from "react";
import "./App.scss";
import GameField from "./layouts/GameField";

class App extends Component {
  constructor (props) {
    super(props);
    this.props = props;
  }

  render () {
    return (
      <div>
        <GameField/>
      </div>
    );
  }
}

export default App;
