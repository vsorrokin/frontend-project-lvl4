// @ts-check

import 'core-js/stable';
import 'regenerator-runtime/runtime';
import React from 'react';
import ReactDOM from 'react-dom';
import gon from 'gon';
import App from './App';
import '../assets/application.scss';
import init from './init';

if (process.env.NODE_ENV !== 'production') {
  localStorage.debug = 'chat:*';
}

init();

ReactDOM.render(
  <React.StrictMode>
    <App data={gon} />
  </React.StrictMode>,
  document.getElementById('chat'),
);
