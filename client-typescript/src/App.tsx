import React, { Fragment } from "react";
import { Route } from "react-router-dom";

import { Landing } from "./pages/Landing";

const App: React.FC = () => {
  return (
    <Fragment>
      <Route exact component={Landing} path='/' />
      <Route exact path='/game' />
      <Route exact path='/game/over' />
    </Fragment>
  );
};

export default App;
