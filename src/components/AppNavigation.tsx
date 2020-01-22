import React from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import IconAdd from '@material-ui/icons/Add';
import IconList from '@material-ui/icons/List';
import { SvgIconProps } from '@material-ui/core/SvgIcon';

import { appConfigRoutes } from '../app-config';

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
 * Root navigation component
 */
export const AppNavigation: React.FC = props => (
  <List {...props}>
    {appConfigRoutes.map(({ icon, label, pathname }) => (
      <ListItem button key={pathname}>
        {icon && icons[icon] && <AppNavigationListItemIcon icon={icon} />}
        <ListItemText primary={label} />
      </ListItem>
    ))}
  </List>
);
