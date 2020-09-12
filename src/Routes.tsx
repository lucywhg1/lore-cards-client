import React from 'react';
import { Switch, Route } from 'react-router-dom';
import ShowCardPage from './components/info_cards/ShowCardPage';
import Dashboard from './components/layout/Dashboard';

const Routes = (): JSX.Element => {
  return (
    <Switch>
      <Route exact path='/'>
        <Dashboard />
      </Route>
      <Route path='/cards/:id'>
        <ShowCardPage />
      </Route>
    </Switch>
  );
};

export default Routes;
