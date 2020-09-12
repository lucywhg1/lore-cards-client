import 'react-toastify/dist/ReactToastify.css';

import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

import Routes from './Routes';

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
        <Routes />
      </BrowserRouter>
      <CustomToastContainer />
    </>
  );
};

export default App;
