import React, { FunctionComponent } from 'react';
import { BrowserRouter as Router, Route, RouteComponentProps, Switch } from 'react-router-dom';
import Analytics from 'react-router-ga';
import NotFound from './components/NotFound';
import config from './config';
import { UiStateProvider } from './context/ui';
import DefaultLayout from './layouts/DefaultLayout';
import { routes } from "./routes";

const AppProviders: FunctionComponent = props => {
  return (
    <UiStateProvider>
      { props.children}
    </UiStateProvider>
  )
}

function App() {
  return (
    <AppProviders>
      <Router>
        <Analytics id={config.ga.propertyId}>
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
        </Analytics>
      </Router>
    </AppProviders>
  );
}

export default App;
