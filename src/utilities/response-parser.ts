import fromEntries from 'fromentries';

import { StoreUserConsentRecord } from '../store/store-defs';

/**
 * Util to get labels from consent properties
 * @TODO store labels alongside other consent data
 */
export const getParsedConsentLabels = (
  consent: StoreUserConsentRecord['consent'],
) =>
  Object.values(
    fromEntries(
      Object.entries(consent)
        .filter(([, value]) => value)
        .map(([key, value]) => {
          let parsedValue: boolean | string = value;

          if (key === 'shouldCollectStats') {
            parsedValue = 'Contribute to anonymous visit statistics';
          } else if (key === 'shouldRecieveNewsLetter') {
            parsedValue = 'Receive Newsletter';
          } else if (key === 'shouldShowTargetedAds') {
            parsedValue = 'Be shown targeted ads';
          }

          return [key, parsedValue];
        }),
    ),
  ).join(', ');
