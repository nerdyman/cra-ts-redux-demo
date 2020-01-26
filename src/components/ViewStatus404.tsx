import React from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';

import { appConfigRoutesInitial } from '../app-config';

/**
 * Root 404 component
 */
export const ViewStatus404: React.FC<{
  staticContext?: RouteComponentProps['staticContext'];
}> = ({ staticContext: _staticContext, ...props }) => (
  <Container maxWidth="md" {...props}>
    <Typography variant="h4" component="h1">
      404: Unable to find page
    </Typography>
    <Button
      variant="contained"
      color="primary"
      component={Link}
      to={appConfigRoutesInitial.pathname}
    >
      Go Home
    </Button>
  </Container>
);
