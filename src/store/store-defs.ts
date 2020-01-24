import { ReducerRootState } from './reducers/reducer-root';

/** User consent record */
export interface StoreUserConsentRecord {
  /** User's name */
  name: string;
  /** User's email */
  email: string;
  /** Consent preferences */
  consent: {
    /** Whether user has permitted statistics collecton */
    shouldCollectStats: boolean;
    /** Whether user has permitted receiving newsletters */
    shouldRecieveNewsLetter: boolean;
    /** Whether user has permitted targeted ads to be used */
    shouldShowTargetedAds: boolean;
  };
}

/** Collection of user consent records */
export type StoreUserConsentCollection = StoreUserConsentRecord[];

/** Root definition for `storeUserContent` */
export interface StoreUserConsent {
  /** Collection of user consent records */
  consents: StoreUserConsentCollection;
}

/** Main store definition */
export type Store = ReducerRootState;
