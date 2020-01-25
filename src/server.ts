import fetchMock from 'fetch-mock';
import { userConsents } from './stubs';

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
    const res = await fetch(USER_CONSENTS_PATH, { method: 'get' });
    return res.json();
  },
  /** Update user consts */
  postUserConsents: async () => {
    fetchMock.resetHistory();
    const res = await fetch(USER_CONSENTS_PATH, { method: 'post' });
    return res.json();
  },
};
