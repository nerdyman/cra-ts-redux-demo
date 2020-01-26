import React from 'react';
import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

import { StubStoreProvider } from '../../store/__stubs__/StoreProvider';
import { ViewGiveConsent } from '../ViewGiveConsent';

test('renders root element', () => {
  const { getByTestId } = render(
    <StubStoreProvider>
      <MemoryRouter>
        <ViewGiveConsent data-testid="view-give-consent" />
      </MemoryRouter>
    </StubStoreProvider>,
  );
  const rootElement = getByTestId('view-give-consent');
  expect(rootElement).toBeInTheDocument();
});
