import * as actions from '../actions';
import * as storeDefs from '../store-defs';
import { userConsents } from '../../stubs';

describe('actions', () => {
  it('creates an action to add user consents', () => {
    const testData: storeDefs.StoreUserConsentRecord = {
      ...userConsents[0],
      consent: {
        ...userConsents[0].consent,
      },
    };

    const expectedAction = {
      type: actions.USER_CONSENT_CONSENTS_ADD,
      payload: [testData],
    };

    expect(actions.userConsentConsentsAdd([testData])).toMatchObject(
      expectedAction,
    );
  });
});
