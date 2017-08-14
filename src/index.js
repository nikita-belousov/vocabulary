import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import { createStore } from 'redux';
import { Provider } from 'react-redux';

import app from './reducers/app';
import initialState from './initialState';
import App from './components/App';

ReactDOM.render(
  <Provider store={createStore(app, initialState)}>
    <App/>
  </Provider>,
  document.getElementById('root')
);
