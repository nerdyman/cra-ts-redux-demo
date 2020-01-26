import { appConfigRoutes, getAppConfigRoutesInitial } from '../app-config';

test('[getAppConfigRoutesInitial] throws if no initial route', () => {
  const invalidRoutes = appConfigRoutes.map(
    ({ initial: _initial, ...route }) => route,
  );
  expect(() => getAppConfigRoutesInitial(invalidRoutes)).toThrow();
});
