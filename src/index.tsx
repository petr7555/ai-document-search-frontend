import React, { StrictMode } from 'react';
import ReactDOM from 'react-dom/client';
import axios from 'axios';
import getApiUrl from './utils/getApiUrl';
import App from './App';
import reportWebVitals from './reportWebVitals';
import * as serviceWorkerRegistration from './serviceWorkerRegistration';

axios.defaults.baseURL = getApiUrl();
axios.interceptors.request.use(
  (config) => {
    const token = JSON.parse(localStorage.getItem('token') || 'null');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Change to false to use backend running on localhost:8000.
const useMswInDev = true;

async function deferRender() {
  if (process.env.NODE_ENV !== 'development' || !useMswInDev) {
    return;
  }

  const { worker } = await import('./mocks/browser');
  // `worker.start()` returns a Promise that resolves
  // once the Service Worker is up and ready to intercept requests.
  return worker.start();
}

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
deferRender().then(() =>
  root.render(
    <StrictMode>
      <App />
    </StrictMode>
  )
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
serviceWorkerRegistration.unregister();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
