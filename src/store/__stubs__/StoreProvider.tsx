import React from 'react';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-redux';

import { userConsents } from '../../stubs';

const stubConfigure = configureStore([]);
const stubStore = stubConfigure({
  userConsent: {
    consents: userConsents,
  },
});

export const StubStoreProvider: React.FC = ({ children }) => (
  <Provider store={stubStore}>{children}</Provider>
);
