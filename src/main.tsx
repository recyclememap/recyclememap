import React from 'react';
import ReactDOM from 'react-dom/client';
import { RootStore } from '@root/store';
import App from './App';
import '../locales/i18n';

const store = new RootStore();

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App store={store} />
  </React.StrictMode>
);
