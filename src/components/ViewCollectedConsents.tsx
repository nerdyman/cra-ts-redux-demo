import React from 'react';

import { useStoreUserConsentGetConsents } from '../utilities/hooks';

export const ViewCollectedConsents: React.FC = () => {
  const userConsents = useStoreUserConsentGetConsents();

  return (
    <div>
      Collected consents
      {userConsents.length > 0 ? (
        userConsents.map(userConsent => (
          <div key={userConsent.email}>
            {userConsent.name}:{userConsent.email}
          </div>
        ))
      ) : (
        <div>Loading consents&hellip;</div>
      )}
    </div>
  );
};
