import { useSelector } from 'react-redux';
import { useLocation } from 'react-router';
import fromEntries from 'fromentries';

import { AppConfigRoute, appConfigRoutes } from '../app-config';
import * as storeDefs from '../store/store-defs';

/** `appConfigRoutes` indexed by their `pathname` property */
const routesIndexedByPathname = fromEntries(
  appConfigRoutes.map(route => [route.pathname, route]),
);

/**
 * Get active route matching current `pathname` if available
 */
export const useRouteActive = (): AppConfigRoute | undefined => {
  const { pathname } = useLocation();

  if (routesIndexedByPathname[pathname]) {
    return routesIndexedByPathname[pathname];
  }

  return undefined;
};

/**
 * Get `userConsent.consents` from store
 */
export const useStoreUserConsentGetConsents = (): storeDefs.StoreUserConsentCollection => {
  const userConsentConsents = useSelector(
    (state: storeDefs.Store) => state.userConsent.consents,
  );
  return userConsentConsents;
};

// export const useStoreUserConsentAddConsents = (record: storeDefs.StoreUserConsentRecord) => {
//     const userConsentConsents = useSelector((state: storeDefs.Store) => st)
// };
