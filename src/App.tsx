import React, { FunctionComponent } from 'react';
import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom';
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
            <Route exact path='/support'>
              <Redirect to='/page/support' />
            </Route>
            {routes.map((route, index) => {
              return (
                <Route
                  key={index}
                  path={route.path}
                  exact={route.exact}
                  component={() => {
                    return (
                      <route.layout>
                        <route.component />
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
