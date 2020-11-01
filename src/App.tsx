import 'App.css';
import NotFound from 'components/NotFound';
import config from 'config';
import { routes } from 'config/routes';
import { UiStateProvider } from 'context/ui';
import DefaultLayout from 'layouts/DefaultLayout';
import React, { FunctionComponent } from 'react';
import { Helmet } from 'react-helmet';
import { Route, RouteComponentProps, Switch } from 'react-router-dom';
import Analytics from 'react-router-ga';

const AppProviders: FunctionComponent = props => {
  return (<>
    <Helmet>
      <title>{config.site.title}</title>
    </Helmet>
    <UiStateProvider>
      <Analytics id={config.ga.propertyId}>
        {props.children}
      </Analytics>
    </UiStateProvider>
  </>)
}

function App() {
  const base = '/:locale(en|id)?';
  return (
    <AppProviders>
      <Switch>
        {routes.map((route, index) => {
          const pathWithBase = base + route.path;
          const path = pathWithBase.endsWith('/') ? pathWithBase.substr(0, pathWithBase.length - 1) : pathWithBase;
          return (
            <Route
              key={index}
              path={path}
              exact={route.exact}
              component={(props: RouteComponentProps) => {
                return (
                  <route.layout>
                    <route.component {...props} />
                  </route.layout>
                )
              }}
            />
          );
        })}

        <Route path='*'>
          <DefaultLayout>
            <NotFound />
          </DefaultLayout>
        </Route>
      </Switch>
    </AppProviders>
  );
}

export default App;
