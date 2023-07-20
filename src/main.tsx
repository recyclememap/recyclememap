import React from 'react';
import ReactDOM from 'react-dom';
import { RootStore } from '@store/index';
import './index.css';
import App from './App';
import '../i18n';

const store = new RootStore();

ReactDOM.render(
  <React.StrictMode>
    <App store={store} />
  </React.StrictMode>,
  document.getElementById('root')
);
