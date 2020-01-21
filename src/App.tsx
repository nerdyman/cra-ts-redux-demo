import React from 'react';
import { SharedLayout } from './components/SharedLayout';

const App: React.FC = () => (
  <SharedLayout
    data-testid="app-root"
    header={<>Header</>}
    footer={<>Footer</>}
  >
    Hi!
  </SharedLayout>
);

// eslint-disable-next-line import/no-default-export
export default App;
