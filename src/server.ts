import fetchMock from 'fetch-mock';
import { userConsents } from './stubs';
import { StoreUserConsentCollection } from './store/store-defs';

const USER_CONSENTS_PATH = '/consents';
const USER_CONSENT_PATH = '/consent';

fetchMock.get(
  USER_CONSENTS_PATH,
  {
    data: userConsents,
  },
  { delay: 250 },
);

fetchMock.post(
  USER_CONSENT_PATH,
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
    const res = await fetch(USER_CONSENT_PATH, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    return res.ok;
  },
};
