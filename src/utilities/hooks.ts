import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import fromEntries from 'fromentries';

import { AppConfigRoute, appConfigRoutes } from '../app-config';
import { server } from '../server';
import { userConsentConsentsAdd } from '../store/actions';
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
  ).reverse();
  return userConsentConsents;
};

/**
 * Add record to `userConsent.consents`
 */
export const useStoreUserConsentAddConsents = () => {
  const dispatch = useDispatch();
  return (payload: storeDefs.StoreUserConsentCollection) =>
    dispatch(userConsentConsentsAdd(payload));
};

/**
 * Post data user consents to server *and* and dispatch to store
 */
export const useServerPostUserConsents = () => {
  const storeUserConsentAddConsents = useStoreUserConsentAddConsents();
  return useCallback(async (payload: storeDefs.StoreUserConsentCollection) => {
    await server.postUserConsents(payload);
    storeUserConsentAddConsents(payload);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
};
