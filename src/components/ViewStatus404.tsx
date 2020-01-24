import React from 'react';
import { Link } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';

/**
 * Root 404 component
 */
export const ViewStatus404: React.FC = () => (
  <Container maxWidth="md">
    <Typography variant="h4" component="h1">
      404: Unable to find page
    </Typography>
    <Button variant="contained" color="primary" component={Link} to="/">
      Go Home
    </Button>
  </Container>
);
