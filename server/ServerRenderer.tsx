import { AxiosInstance } from 'axios';
import { Request } from 'express';
import React from 'react';
import ReactDomServer from 'react-dom/server';
import { StaticRouter } from 'react-router-dom';
import { ApiProvider, injectSSRHtml } from 'react-use-api';
import App from '../src/App';
import { makeApiContext } from '../src/context/api';

const render = async (req: Request, axios: AxiosInstance) => {
  const { url } = req
  const apiContext = makeApiContext(axios)
  const routerContext = {}
  const renderSSR = () =>
    ReactDomServer.renderToString(
      <ApiProvider context={apiContext}>
        <StaticRouter location={url} context={routerContext}>
          <App />
        </StaticRouter>
      </ApiProvider>
    )
  const html = await injectSSRHtml(apiContext, renderSSR)
  return html
}

export default { render };
