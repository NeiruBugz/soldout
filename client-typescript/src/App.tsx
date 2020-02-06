import React from 'react';
import { BrowserRouter, Route, Redirect, Switch } from 'react-router-dom';

import { Landing, GameFieldController as Game } from './pages';
import { ChoosePlaylist } from './pages/GameField/components/ChoosePlaylist';

const App: React.FC = () => (
  <BrowserRouter>
    <Switch>
      <Route exact component={Landing} path="/" />
      <Route exact component={Game} path="/game" />
      <Route exact path="/game/over" />
      <Route exact component={ChoosePlaylist} path="/choose-playlist" />
      <Redirect to="/" />
    </Switch>
  </BrowserRouter>
);

export default App;
