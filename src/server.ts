import fetchMock from 'fetch-mock';
import { userConsents } from './stubs';
import { StoreUserConsentCollection } from './store/store-defs';

const USER_CONSENTS_PATH = '/api/user-consents';

fetchMock.get(
  USER_CONSENTS_PATH,
  {
    data: userConsents,
  },
  { delay: 250 },
);

fetchMock.post(
  USER_CONSENTS_PATH,
  {
    data: {
      updated: new Date().toISOString(),
    },
  },
  { delay: 250 },
);

/** Fake server */
export const server = {
  /** Get user consents */
  getUserConsents: async () => {
    fetchMock.resetHistory();
    const res = await fetch(USER_CONSENTS_PATH, { method: 'GET' });
    return res.json();
  },
  /** Update user consts */
  postUserConsents: async (payload: StoreUserConsentCollection) => {
    fetchMock.resetHistory();
    const res = await fetch(USER_CONSENTS_PATH, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });
    return res.json();
  },
};
