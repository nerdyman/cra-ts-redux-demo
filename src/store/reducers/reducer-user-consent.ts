import { USER_CONSENT_CONSENTS_ADD, UserConsentActionTypes } from '../actions';
import { StoreUserConsent } from '../store-defs';

const initialState: StoreUserConsent = {
  consents: [],
};

/**
 * Reducer for `userContent` store
 */
export const reducerUserConsent = (
  state: StoreUserConsent = initialState,
  action: UserConsentActionTypes,
): StoreUserConsent => {
  switch (action.type) {
    case USER_CONSENT_CONSENTS_ADD:
      return {
        ...state,
        consents: [...state.consents, ...action.payload],
      };

    default:
      return state;
  }
};
