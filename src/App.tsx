import 'react-toastify/dist/ReactToastify.css';

import React from 'react';
import { ToastContainer } from 'react-toastify';

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
      <Dashboard />
      <CustomToastContainer />
    </>
  );
};

export default App;
