import React from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

import { getParsedConsentLabels } from '../utilities/response-parser';
import { useStoreUserConsentGetConsents } from '../utilities/hooks';

/**
 * Get consents with `.consent` values mapped to labels
 */
const useConsentsTableRows = () => {
  const userConsents = useStoreUserConsentGetConsents();
  const rows = userConsents.map(({ consent, ...props }) => ({
    ...props,
    consent: getParsedConsentLabels(consent),
  }));

  return rows;
};

/**
 * View collected consents view
 * @TODO Source table props from object
 * @TODO Show labels instead of property names for consent column
 */
export const ViewCollectedConsents: React.FC<App.ReactFCTestProps> = props => {
  const rowsPerPage = 2;
  const [page, setPage] = React.useState(0);
  const rows = useConsentsTableRows();

  const handleChangePage = (_event: unknown, newPage: number): void => {
    setPage(newPage);
  };

  const emptyRows =
    rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);

  return (
    <Paper data-testid={props['data-testid']}>
      <TableContainer>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Consent Given For</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map(row => (
                <TableRow key={row.name}>
                  <TableCell component="th" scope="row">
                    {row.name}
                  </TableCell>
                  <TableCell>{row.email}</TableCell>
                  <TableCell>{row.consent}</TableCell>
                </TableRow>
              ))}
            {emptyRows > 0 && (
              <TableRow style={{ height: 53 * emptyRows }}>
                <TableCell colSpan={6} />
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[2]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onChangePage={handleChangePage}
      />
    </Paper>
  );
};
