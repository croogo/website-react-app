import React, { FunctionComponent } from 'react';
import { Helmet } from 'react-helmet';
import { Route, RouteComponentProps, Switch } from 'react-router-dom';
import Analytics from 'react-router-ga';
import './App.css';
import NotFound from './components/NotFound';
import config from './config';
import { UiStateProvider } from './context/ui';
import DefaultLayout from './layouts/DefaultLayout';
import { routes } from "./routes";

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
  return (
    <AppProviders>
      <Switch>
        {routes.map((route, index) => {
          return (
            <Route
              key={index}
              path={route.path}
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
