import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

import { useStoreUserConsentGetConsents } from '../utilities/hooks';

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

// function createData(
//   name: string,
//   calories: number,
//   fat: number,
//   carbs: number,
//   protein: number,
// ) {
//   return { name, calories, fat, carbs, protein };
// }

// const rows = [
//   createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
//   createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
//   createData('Eclair', 262, 16.0, 24, 6.0),
//   createData('Cupcake', 305, 3.7, 67, 4.3),
//   createData('Gingerbread', 356, 16.0, 49, 3.9),
// ];

// const useConsentsTableRows = () => {
//   const userConsents = useStoreUserConsentGetConsents();
//   const rows = userConsents.map(({ consent, ...props }) => ({
//     ...props,
//     ...fromEntries(
//       Object.entries(consent).map(([key, value]) => [`consent${key}`, value]),
//     ),
//   }));

//   return rows;
// };

/**
 * View collected consents view
 * @TODO Source table props from object
 * @TODO Show labels instead of property names for consent column
 */
export const ViewCollectedConsents: React.FC = () => {
  const rowsPerPage = 2;
  const [page, setPage] = React.useState(0);
  const classes = useStyles();
  const rows = useStoreUserConsentGetConsents();

  const handleChangePage = (_event: unknown, newPage: number): void => {
    setPage(newPage);
  };

  const emptyRows =
    rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);

  return (
    <Paper>
      <TableContainer>
        <Table className={classes.table} aria-label="simple table">
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
                  <TableCell>
                    {/* This is real dirty */}
                    {Object.entries(row.consent)
                      .map(([key, value]) => (value === true ? key : false))
                      .filter(Boolean)
                      .join(', ')}
                  </TableCell>
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
