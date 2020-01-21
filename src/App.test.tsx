import React from 'react';
import { render } from '@testing-library/react';
import App from './App';

test('renders root element', () => {
  const { getByTestId } = render(<App />);
  const rootElement = getByTestId('app-root');
  expect(rootElement).toBeInTheDocument();
});
