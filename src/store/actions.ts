import { StoreUserConsent } from './store-defs';

export const USER_CONSENT_ADD = 'USER_CONSENT_ADD';

/** Consent Add action type/payload */
export interface UserConsentAddAction {
  type: typeof USER_CONSENT_ADD;
  payload: StoreUserConsent;
}

/** Union of consent action types */
export type UserConsentActionTypes = UserConsentAddAction;
