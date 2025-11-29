import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { Storage } from 'react-jhipster';
import App from './app';
import store from './config/store';
import setupAxiosInterceptors from './config/axios-interceptor';
import { logoutSession } from './shared/auth/auth.reducer';
import 'antd/dist/reset.css';
import '../content/css/global.css';

// Setup axios interceptors for JWT token handling
const onUnauthenticated = () => {
  Storage.local.remove('jhi-authenticationToken');
  Storage.session.remove('jhi-authenticationToken');
  store.dispatch(logoutSession());
};

setupAxiosInterceptors(onUnauthenticated);

const container = document.getElementById('root');
const root = createRoot(container);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>,
);
