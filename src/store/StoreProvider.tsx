import React from 'react';
import { Provider } from 'react-redux';
import { applyMiddleware, createStore, Middleware } from 'redux';
import reduxImmutableStateInvariant from 'redux-immutable-state-invariant';
import { composeWithDevTools } from 'redux-devtools-extension';

import { logger } from '../utilities/logger';
import { runtimeIsDebug } from '../utilities/runtime';
import { reducerRoot } from './reducers/reducer-root';

const configureStore = () => {
  const middlewares: Middleware[] = [];

  if (runtimeIsDebug) {
    logger.debug('[store] Adding debug middlewares');
    // Profile store for direct mutations
    middlewares.push(reduxImmutableStateInvariant());
  }

  const middlewaresEnhancer = applyMiddleware(...middlewares);
  const composedEnchancers = runtimeIsDebug
    ? composeWithDevTools(...[middlewaresEnhancer])
    : middlewaresEnhancer;

  const store = createStore(reducerRoot, composedEnchancers);

  return store;
};

const store = configureStore();

/**
 * Main store provider
 */
export const StoreProvider: React.FC = (props): React.ReactElement => (
  <Provider store={store} {...props} />
);
