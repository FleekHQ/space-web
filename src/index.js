import React from 'react';
import i18n from 'i18next';
import ReactDOM from 'react-dom';
import * as Sentry from '@sentry/react';
import { Integrations } from '@sentry/tracing';
import { initReactI18next } from 'react-i18next';

import App from './App';
import config from './config';
import initConfig from './locales';

import * as serviceWorker from './serviceWorker';

i18n.use(initReactI18next).init(initConfig);

Sentry.init({
  maxValueLength: 5000,
  dsn: config.sentry.dsn,
  release: process.env.REACT_APP_SENTRY_RELEASE,
  integrations: [new Integrations.BrowserTracing()],
  environment: process.env.REACT_APP_FE_NODE_ENV || 'development',
  tracesSampleRate: process.env.REACT_APP_FE_NODE_ENV === 'production' ? 0.5 : 1,
});

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root'),
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
