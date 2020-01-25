import { StoreUserConsent } from './store-defs';

export const USER_CONSENT_CONSENTS_ADD = 'USER_CONSENT_CONSENTS_ADD';

/** Consent Add action type/payload */
export interface UserConsentConsentsAddAction {
  type: typeof USER_CONSENT_CONSENTS_ADD;
  payload: StoreUserConsent['consents'];
}

/** Union of consent action types */
export type UserConsentActionTypes = UserConsentConsentsAddAction;

/**
 * Add consents to store
 */
export const userConsentConsentsAdd = (
  payload: StoreUserConsent['consents'],
): UserConsentConsentsAddAction => {
  return {
    type: USER_CONSENT_CONSENTS_ADD,
    payload,
  };
};
