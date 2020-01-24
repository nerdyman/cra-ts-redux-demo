import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import {
  makeStyles,
  useTheme,
  Theme,
  createStyles,
} from '@material-ui/core/styles';
import { Link } from 'react-router-dom';

import { ReactComponent as Logo } from '../logo.svg';
import { appConfigBranding, appConfigRoutesInitial } from '../app-config';
import { useRouteActive } from '../utilities/hooks';
import { AppNavigation, AppNavigationProps } from './AppNavigation';

const drawerWidth = 240;

/** Styles for `AppLayoutSide` */
const useAppLayoutSideStyles = makeStyles((theme: Theme) =>
  createStyles({
    logo: {
      ...theme.mixins.toolbar,
      display: 'flex',
      alignItems: 'center',
      paddingLeft: theme.spacing(2),
      paddingRight: theme.spacing(2),
      color: theme.palette.primary.dark,
    },
    logoSvg: {
      width: '2rem',
      marginRight: theme.spacing(1),
      color: theme.palette.primary.main,
    },
    logoText: {
      letterSpacing: '.1rem',
      textTransform: 'uppercase',
    },
  }),
);

/** Side content for `AppLayout` */
const AppLayoutSide: React.FC<AppNavigationProps> = ({
  onNavItemClick,
  ...props
}) => {
  const classes = useAppLayoutSideStyles();

  return (
    <div {...props}>
      <Link className={classes.logo} to={appConfigRoutesInitial.pathname}>
        <Logo className={classes.logoSvg} />
        <Typography
          variant="subtitle2"
          component="p"
          className={classes.logoText}
        >
          {appConfigBranding.name}
        </Typography>
      </Link>
      <Divider />
      <AppNavigation onNavItemClick={onNavItemClick} />
    </div>
  );
};

/**
 * Main layout title
 */
const AppLayoutTitle: React.FC = () => {
  const route = useRouteActive();
  const title = route?.title || appConfigBranding.name;

  return (
    <Typography variant="h6" component="h1" noWrap>
      {title}
    </Typography>
  );
};

const useAppLayoutStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
    },
    drawer: {
      [theme.breakpoints.up('sm')]: {
        width: drawerWidth,
        flexShrink: 0,
      },
    },
    appBar: {
      [theme.breakpoints.up('sm')]: {
        width: `calc(100% - ${drawerWidth}px)`,
        marginLeft: drawerWidth,
      },
    },
    menuButton: {
      marginRight: theme.spacing(2),
      [theme.breakpoints.up('sm')]: {
        display: 'none',
      },
    },
    drawerPaper: {
      width: drawerWidth,
    },
    content: {
      flexGrow: 1,
      padding: theme.spacing(3),
    },
    toolbar: theme.mixins.toolbar,
  }),
);

export const AppLayout: React.FC = ({ children, ...props }) => {
  const classes = useAppLayoutStyles();
  const theme = useTheme();
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = (): void => {
    setMobileOpen(!mobileOpen);
  };

  return (
    <div className={classes.root} {...props}>
      <CssBaseline />
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            className={classes.menuButton}
          >
            <MenuIcon />
          </IconButton>
          <AppLayoutTitle />
        </Toolbar>
      </AppBar>
      <nav className={classes.drawer} aria-label="Navigation">
        <Hidden smUp implementation="css">
          <Drawer
            variant="temporary"
            anchor={theme.direction === 'rtl' ? 'right' : 'left'}
            open={mobileOpen}
            onClose={handleDrawerToggle}
            classes={{
              paper: classes.drawerPaper,
            }}
            ModalProps={{
              keepMounted: true,
            }}
          >
            <AppLayoutSide onNavItemClick={handleDrawerToggle} />
          </Drawer>
        </Hidden>
        <Hidden xsDown implementation="css">
          <Drawer
            classes={{
              paper: classes.drawerPaper,
            }}
            variant="permanent"
            open
          >
            <AppLayoutSide />
          </Drawer>
        </Hidden>
      </nav>
      <main className={classes.content}>
        <div className={classes.toolbar} />
        {children}
      </main>
    </div>
  );
};
