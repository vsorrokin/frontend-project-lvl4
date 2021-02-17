// @ts-check

import 'core-js/stable';
import 'regenerator-runtime/runtime';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import gon from 'gon';

import reducer from './store';
import App from './components/App';
import '../assets/application.scss';
import initNickname from './libs/nickname';
import initSocket from './libs/socket';
import initI18n from './i18n';

if (process.env.NODE_ENV !== 'production') {
  localStorage.debug = 'chat:*';
}

const nickname = initNickname();

const store = configureStore({
  reducer,
  preloadedState: {
    chat: {
      ...gon,
      visibleModalName: null,
      modalData: null,
    },
  },
});

initSocket(store);
initI18n();

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App nickname={nickname} />
    </Provider>
  </React.StrictMode>,
  document.getElementById('chat'),
);
