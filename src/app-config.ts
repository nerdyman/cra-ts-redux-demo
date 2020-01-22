/**
 * @module config
 * @desc General app configuration
 */

/**
 * Individual route definition
 */
export interface AppConfigRoute {
  /** Material icon ID for route */
  icon?: string;
  /** Whether route is the initial on app load */
  initial?: boolean;
  /** Route navigation label */
  label: string;
  /** Route path */
  pathname: string;
}

/**
 * Route definitions for app
 */
export const appConfigRoutes: AppConfigRoute[] = [
  {
    icon: 'IconAdd',
    initial: true,
    label: 'Give Consent',
    pathname: '/give-consent',
  },
  {
    icon: 'IconList',
    label: 'Collected Consents',
    pathname: '/collected-consents',
  },
];
