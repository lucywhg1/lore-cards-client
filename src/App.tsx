import 'react-toastify/dist/ReactToastify.css';

import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

import Home from './components/Home';
import ShowCardPage from './components/info_cards/ShowCardPage';
import Dashboard from './components/layout/Dashboard';

const CustomToastContainer: React.FC = () => {
  return (
    <ToastContainer
      position='top-right'
      autoClose={2000}
      hideProgressBar={false}
      newestOnTop
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
    />
  );
};

const App: React.FC = () => {
  return (
    <>
      <BrowserRouter>
        <Dashboard />
        <Switch>
          <Route exact path='/'>
            <Home />
          </Route>
          <Route path='/cards/:id'>
            <ShowCardPage />
          </Route>
        </Switch>
      </BrowserRouter>
      <CustomToastContainer />
    </>
  );
};

export default App;
