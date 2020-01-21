import React from 'react';
import styled from '@emotion/styled';

/**
 * Root component within layout
 */
const SharedLayoutRoot = styled.main`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  overflow: hidden;
`;

/**
 * Extremity (header/footer) component within layout
 */
const SharedLayoutExtremity = styled.div`
  display: flex;
  align-items: center;
  flex-shrink: 0;
`;

const SharedLayoutHeader = SharedLayoutExtremity.withComponent('header');
const SharedLayoutFooter = SharedLayoutExtremity.withComponent('footer');

/**
 * Main component within layout (wraps `children`)
 */
const SharedLayoutMain = styled.section`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  overflow-y: auto;
`;

/**
 * Props for `SharedLayout`
 */
export interface SharedLayoutProps {
  /** Element to render within header container */
  header?: React.ReactElement;
  /** Element to render within footer container */
  footer?: React.ReactElement;
}

/**
 * Full-height layout with optional header/footer props
 */
export const SharedLayout: React.FC<React.HTMLProps<HTMLElement> &
  SharedLayoutProps> = ({ header, footer, children, ...props }) => (
  <SharedLayoutRoot {...props}>
    {header && <SharedLayoutHeader role="banner">{header}</SharedLayoutHeader>}
    <SharedLayoutMain role="main">{children}</SharedLayoutMain>
    {footer && <SharedLayoutFooter>{footer}</SharedLayoutFooter>}
  </SharedLayoutRoot>
);
