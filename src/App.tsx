import React from 'react';
import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom';
import Analytics from 'react-router-ga';
import NotFound from './components/NotFound';
import config from './config';
import DefaultLayout from './layouts/DefaultLayout';
import { routes } from "./routes";

function App() {
  return (
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
  );
}

export default App;
