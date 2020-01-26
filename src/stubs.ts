/**
 * @module stubs
 * @desc Mock data
 */

import { StoreUserConsentCollection } from './store/store-defs';

export const userConsents: StoreUserConsentCollection = [
  {
    consent: {
      shouldCollectStats: true,
      shouldRecieveNewsLetter: true,
      shouldShowTargetedAds: true,
    },
    name: 'Artimus Dubois',
    email: 'artimus.dubois@example.com',
  },
  {
    consent: {
      shouldCollectStats: true,
      shouldRecieveNewsLetter: true,
      shouldShowTargetedAds: true,
    },
    name: 'Charlie Kelly',
    email: 'charlie.kelly@example.com',
  },
  {
    consent: {
      shouldCollectStats: false,
      shouldRecieveNewsLetter: true,
      shouldShowTargetedAds: true,
    },
    name: 'Deandra Reynolds',
    email: 'deandra.reynolds@example.com',
  },
  {
    consent: {
      shouldCollectStats: false,
      shouldRecieveNewsLetter: true,
      shouldShowTargetedAds: true,
    },
    name: 'Dennis Reynolds',
    email: 'dennis.reynolds@example.com',
  },
  {
    consent: {
      shouldCollectStats: false,
      shouldRecieveNewsLetter: true,
      shouldShowTargetedAds: false,
    },
    name: 'Frank Reynolds',
    email: 'frank.reynolds@example.com',
  },
  {
    consent: {
      shouldCollectStats: false,
      shouldRecieveNewsLetter: true,
      shouldShowTargetedAds: true,
    },
    name: 'Matthew Mara',
    email: 'matthew.mara@example.com',
  },
  {
    consent: {
      shouldCollectStats: false,
      shouldRecieveNewsLetter: true,
      shouldShowTargetedAds: true,
    },
    name: 'Chrundle The Great',
    email: 'chrundle.the.great@example.com',
  },
  {
    consent: {
      shouldCollectStats: true,
      shouldRecieveNewsLetter: false,
      shouldShowTargetedAds: false,
    },
    name: 'Rickety Cricket',
    email: 'rickety.cricket@example.com',
  },
];
