import { combineReducers } from 'redux';

import { reducerUserConsent } from './reducer-user-consent';

/** Root container for all reducers */
export const reducerRoot = combineReducers({
  userConsent: reducerUserConsent,
});

/** Full reducer definition */
export type ReducerRootState = ReturnType<typeof reducerRoot>;
