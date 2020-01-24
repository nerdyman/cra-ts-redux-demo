import React from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import IconAdd from '@material-ui/icons/Add';
import IconList from '@material-ui/icons/List';
import { SvgIconProps } from '@material-ui/core/SvgIcon';
import { Link } from 'react-router-dom';

import { appConfigRoutes } from '../app-config';
import { useRouteActive } from '../utilities/hooks';

/** SVG Icons indexed by import name */
const icons: { [key: string]: (props: SvgIconProps) => JSX.Element } = {
  IconAdd,
  IconList,
};

/**
 * List item icon which maps to `icons`
 */
export const AppNavigationListItemIcon: React.FC<{ icon: string }> = ({
  icon,
  ...props
}) => {
  const Icon = icons[icon];
  return (
    <ListItemIcon {...props}>
      <Icon />
    </ListItemIcon>
  );
};

/**
 * Props for `AppNavigation` component
 */
export interface AppNavigationProps {
  /** Callback handler for navigation item click */
  onNavItemClick?: () => void;
}

/**
 * Root navigation component
 */
export const AppNavigation: React.FC<AppNavigationProps> = ({
  onNavItemClick,
  ...props
}) => {
  const activeRoute = useRouteActive();
  const activePathname = activeRoute?.pathname;

  return (
    <List {...props}>
      {appConfigRoutes.map(({ icon, label, pathname }) => (
        <ListItem
          button
          component={Link}
          key={pathname}
          onClick={onNavItemClick}
          selected={pathname === activePathname}
          to={pathname}
        >
          {icon && icons[icon] && <AppNavigationListItemIcon icon={icon} />}
          <ListItemText primary={label} />
        </ListItem>
      ))}
    </List>
  );
};
