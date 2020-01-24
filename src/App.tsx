import React from 'react';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';

import { appConfigRoutes, appConfigRoutesInitial } from './app-config';
import { StoreProvider } from './store/StoreProvider';
import { AppLayout } from './components/AppLayout';
import { ViewGiveConsent } from './components/ViewGiveConsent';
import { ViewCollectedConsents } from './components/ViewCollectedConsents';
import { ViewStatus404 } from './components/ViewStatus404';

/**
 * Valid routes
 */
const views: { [key: string]: React.FC } = {
  ViewGiveConsent,
  ViewCollectedConsents,
};

const App: React.FC = props => (
  <StoreProvider>
    <BrowserRouter>
      <AppLayout data-testid="app-root" {...props}>
        <Switch>
          {appConfigRoutes.map(route => (
            <Route
              key={route.pathname}
              exact
              path={route.pathname}
              component={views[route.component]}
            />
          ))}
          <Redirect exact from="/" to={appConfigRoutesInitial.pathname} />
          <Route component={ViewStatus404} />
        </Switch>
      </AppLayout>
    </BrowserRouter>
  </StoreProvider>
);

// eslint-disable-next-line import/no-default-export
export default App;
