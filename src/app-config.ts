/**
 * @module config
 * @desc General app configuration
 */

export const appConfigBranding = {
  name: 'Consent App',
};

/**
 * Individual route definition
 */
export interface AppConfigRoute {
  /** Component route is bound to */
  component: string;
  /** Material icon ID for route */
  icon?: string;
  /** Whether route is the initial on app load */
  initial?: boolean;
  /** Route navigation label */
  label: string;
  /** Route path */
  pathname: string;
  /** Route title */
  title: string;
}

/** List of `AppRoute` */
export type AppConfigRoutes = AppConfigRoute[];

/**
 * Route definitions for pages
 */
export const appConfigRoutes: AppConfigRoutes = [
  {
    component: 'ViewGiveConsent',
    icon: 'IconAdd',
    initial: true,
    label: 'Give Consent',
    pathname: '/give-consent',
    title: 'Give User Consent',
  },
  {
    component: 'ViewCollectedConsents',
    icon: 'IconList',
    label: 'Collected Consents',
    pathname: '/collected-consents',
    title: 'View Collected Consents',
  },
];

/**
 * Get initial route (throw error if not found)
 */
export const getAppConfigRoutesInitial = (
  appConfigRoutes: AppConfigRoutes,
): AppConfigRoute => {
  const routesInitial = appConfigRoutes.find(route => route.initial);

  if (!routesInitial) {
    throw new Error(
      '[getAppConfigRoutesInitial] Unable to find initial route.',
    );
  }

  return routesInitial;
};

/**
 * Initial (default) route
 */
export const appConfigRoutesInitial = getAppConfigRoutesInitial(
  appConfigRoutes,
);
