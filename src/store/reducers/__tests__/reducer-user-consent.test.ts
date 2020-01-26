import { reducerUserConsent } from '../reducer-user-consent';
import { USER_CONSENT_CONSENTS_ADD } from '../../actions';

test('returns correct state for `USER_CONSENT_CONSENTS_ADD`', () => {
  expect(
    reducerUserConsent(
      { consents: [] },
      {
        payload: [
          {
            consent: {
              shouldCollectStats: false,
              shouldRecieveNewsLetter: false,
              shouldShowTargetedAds: true,
            },
            email: 'the.warthog@example.com',
            name: 'The Warthog',
          },
        ],
        type: USER_CONSENT_CONSENTS_ADD,
      },
    ),
  ).toEqual({
    consents: [
      {
        consent: {
          shouldCollectStats: false,
          shouldRecieveNewsLetter: false,
          shouldShowTargetedAds: true,
        },
        email: 'the.warthog@example.com',
        name: 'The Warthog',
      },
    ],
  });
});
