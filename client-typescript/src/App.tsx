import React from 'react';
import { BrowserRouter, Route, Redirect, Switch } from 'react-router-dom';

import { Landing, GameFieldController as Game } from './pages';

const App: React.FC = () => (
  <BrowserRouter>
    <Switch>
      <Route exact component={Landing} path="/" />
      <Route exact component={Game} path="/game" />
      <Route exact path="/game/over" />
      <Redirect to="/" />
    </Switch>
  </BrowserRouter>
);

export default App;
