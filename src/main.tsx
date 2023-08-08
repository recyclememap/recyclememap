import React from 'react';
import ReactDOM from 'react-dom/client';
import { RootStore } from '@store/index';
import './index.css';
import App from './App';
import '../i18n';

const store = new RootStore();

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App store={store} />
  </React.StrictMode>
);
