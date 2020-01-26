import React from 'react';
import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { ViewStatus404 } from '../ViewStatus404';

test('renders root element', () => {
  const { getByTestId } = render(
    <MemoryRouter>
      <ViewStatus404 data-testid="view-give-consent" />
    </MemoryRouter>,
  );
  const rootElement = getByTestId('view-give-consent');
  expect(rootElement).toBeInTheDocument();
});
