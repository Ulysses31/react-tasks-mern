import React from 'react';
import { Provider } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import Content from './components/content/content';
import store from './state/store';
import 'react-toastify/dist/ReactToastify.css';
import 'react-datepicker/dist/react-datepicker.css';
import './App.css';

function App() {
  return (
    <Provider store={store}>
      <ToastContainer autoClose={3000} />
      <Content />
    </Provider>
  );
}

export default App;
