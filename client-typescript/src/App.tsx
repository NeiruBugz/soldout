import React, { Fragment } from "react";
import { Route } from "react-router-dom";

import { Landing } from "./pages/Landing";
import GameField from "./pages/GameField";

const App: React.FC = () => {
  return (
    <Fragment>
      <Route exact component={Landing} path='/' />
      <Route exact component={GameField} path='/game' />
      <Route exact path='/game/over' />
    </Fragment>
  );
};

export default App;
