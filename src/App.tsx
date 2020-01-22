import React from 'react';
import { AppLayout } from './components/AppLayout';

const App: React.FC = props => (
  <AppLayout data-testid="app-root" {...props}>
    Hello!
  </AppLayout>
);

// eslint-disable-next-line import/no-default-export
export default App;
