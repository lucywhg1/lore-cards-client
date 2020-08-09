import './styles/App.scss';
import 'react-toastify/dist/ReactToastify.css';

import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

import Home from './components/Home';
import ShowCardPage from './components/info_cards/ShowCardPage';

const App: React.FC = () => {
  return (
    <>
      <BrowserRouter>
        <Switch>
          <Route exact path='/'>
            <Home />
          </Route>
          <Route path='/cards/:id'>
            <ShowCardPage />
          </Route>
        </Switch>
      </BrowserRouter>
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
    </>
  );
};

export default App;
