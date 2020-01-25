import React, { useEffect } from 'react';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';

import { appConfigRoutes, appConfigRoutesInitial } from './app-config';
import { server } from './server';
import { useStoreUserConsentAddConsents } from './utilities/hooks';
import { logger } from './utilities/logger';
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

/**
 * Isolated init component to dispatch initial app state
 */
const AppInit: React.FC = () => {
  const storeUserConsentAddConsents = useStoreUserConsentAddConsents();

  useEffect(() => {
    server
      .getUserConsents()
      .then(({ data }) => storeUserConsentAddConsents(data))
      .catch(err => logger.error('[AppInit] Unable to fetch consents.', err));
  }, [storeUserConsentAddConsents]);

  return null;
};

const App: React.FC = props => (
  <StoreProvider>
    <AppInit />
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
