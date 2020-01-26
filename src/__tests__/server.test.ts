import { server } from '../server';
import { userConsents } from '../stubs';

describe('[server]', () => {
  test('[getUserConsents] matches response', async () => {
    expect(await server.getUserConsents()).toMatchObject({
      data: userConsents,
    });
  });

  test('[postUserConsents] matches response', async () => {
    expect(await server.postUserConsents([userConsents[0]])).toBe(true);
  });
});
