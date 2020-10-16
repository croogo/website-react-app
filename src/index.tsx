import App from 'App';
import 'assets/scss/demo.scss';
import 'assets/scss/lazy.scss';
import 'bootstrap/dist/css/bootstrap.css';
import { makeApiContext, makeAxios } from 'context/api';
import 'fontawesome';
import 'index.css';
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { ApiProvider, loadApiCache } from 'react-use-api';
import * as serviceWorker from 'serviceWorker';

const axios = makeAxios();
const apiContext = makeApiContext(axios);
const rootElement = document.getElementById('root')!;
const method = rootElement.hasChildNodes() ? 'hydrate' : 'render';

loadApiCache();

ReactDOM[method](
  <ApiProvider context={ apiContext }>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </ApiProvider>,
  rootElement
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
