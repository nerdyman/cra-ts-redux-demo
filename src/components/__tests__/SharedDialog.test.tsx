import React from 'react';
import { render } from '@testing-library/react';
import { renderHook, act } from '@testing-library/react-hooks';

import {
  SharedDialog,
  SharedDialogTitle,
  useSharedDialogState,
} from '../SharedDialog';

test('[useSharedDialogState] returns state object', () => {
  const { result } = renderHook(() => useSharedDialogState({ visible: true }));

  expect(typeof result.current.hide).toBe('function');
  expect(typeof result.current.show).toBe('function');
  expect(typeof result.current.toggle).toBe('function');
  expect(typeof result.current.visible).toBe('boolean');
});

test('[useSharedDialogState] hides visible state', () => {
  const { result } = renderHook(() => useSharedDialogState({ visible: true }));

  act(() => {
    result.current.hide();
  });

  expect(result.current.visible).toBe(false);
});

test('[useSharedDialogState] shows visible state', () => {
  const { result } = renderHook(() => useSharedDialogState({ visible: false }));

  act(() => {
    result.current.show();
  });

  expect(result.current.visible).toBe(true);
});

test('[useSharedDialogState] toggles visible state', () => {
  const { result } = renderHook(() => useSharedDialogState({ visible: true }));

  act(() => {
    result.current.toggle();
  });

  expect(result.current.visible).toBe(false);
});

test('[SharedDialog] renders children', () => {
  const { result } = renderHook(() => useSharedDialogState({ visible: true }));
  const Dialog: React.FC = () => (
    <SharedDialog sharedDialogState={result.current}>
      <div data-testid="shared-dialog-children">Testaroo!</div>
    </SharedDialog>
  );

  const { getByTestId } = render(<Dialog />);
  const rootElement = getByTestId('shared-dialog-children');
  expect(rootElement).toBeInTheDocument();
});

test('[SharedDialog] renders title', () => {
  const { result } = renderHook(() => useSharedDialogState({ visible: true }));
  const Dialog: React.FC = () => (
    <SharedDialog
      sharedDialogState={result.current}
      title={<div data-testid="shared-dialog-title"></div>}
    >
      Testaroo
    </SharedDialog>
  );

  const { getByTestId } = render(<Dialog />);

  const titleElement = getByTestId('shared-dialog-title');
  expect(titleElement).toBeInTheDocument();
});

test('[SharedDialogTitle] does not renders close', () => {
  const Title: React.FC = () => (
    <SharedDialogTitle>
      <div data-testid="shared-dialog-title-children">Testaroo</div>
    </SharedDialogTitle>
  );

  const { getByTestId } = render(<Title />);

  const titleElement = getByTestId('shared-dialog-title-children');
  expect(titleElement).toBeInTheDocument();
});
