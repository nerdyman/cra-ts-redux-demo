import React from 'react';
import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

import { StubStoreProvider } from '../../store/__stubs__/StoreProvider';
import { ViewCollectedConsents } from '../ViewCollectedConsents';

test('renders root element', () => {
  const { getByTestId } = render(
    <StubStoreProvider>
      <MemoryRouter>
        <ViewCollectedConsents data-testid="view-give-consent" />
      </MemoryRouter>
    </StubStoreProvider>,
  );
  const rootElement = getByTestId('view-give-consent');
  expect(rootElement).toBeInTheDocument();
});
