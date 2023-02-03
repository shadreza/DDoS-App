import { Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, Typography } from '@mui/material';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { clearDataJson } from '../redux/features/dataJson';
import { RootState } from '../redux/store';

const DataTable = () => {

  const {dataJson, headers} = useSelector((state: RootState) => state.dataStore)
  const dispatch = useDispatch();

  const rows = dataJson

  const capitalizeFirstLetterOfString = (str: String): String => {
    const arr = str.split(" ")
    for (let i = 0; i < arr.length; i++) {
      arr[i] = arr[i].charAt(0).toUpperCase() + arr[i].slice(1)
    }
    return arr.join(" ")
  }

  interface Header {
    id: String,
    label: String,
  }

  const columns: Header[] = []

  for (let i = 0; i < headers.length; i++) {
    columns.push({
      id: headers[i],
      label: capitalizeFirstLetterOfString(headers[i]),
    })
  }

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <div>
      <Typography
        variant='overline'
        sx={{ fontWeight: 'bold', mr: 4 }}
      >
        total <span style={{ color: 'orange', fontSize: 16 }}>{dataJson.length}</span> rows are selected
      </Typography>
      {
        dataJson.length === 0 ? 
          <Button
            variant='contained'
            color='warning'
            disabled
          >
            Reset
          </Button>
          :
          <Button
            variant='contained'
            color='warning'
            onClick={() => dispatch(clearDataJson())}
          >
            Reset
          </Button>
      }
      <Paper sx={{ mt: 4, width: '100%', overflow: 'hidden' }}>
        <TableContainer sx={{ maxHeight: 440 }}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                {columns.map((column) => (
                  <TableCell
                    key={column.id as string}
                    align='right'
                    style={{ minWidth: 150 }}
                  >
                    {column.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {rows
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, i) => {
                  return (
                    <TableRow hover role="checkbox" tabIndex={-1} key={i}>
                      {columns.map((column) => {
                        let str = column["id"] as keyof typeof row; 
                        const value = row[str].toString()
                        return (
                          <TableCell key={column.id as string} align='right'>
                            {value}
                          </TableCell>
                        );
                      })}
                    </TableRow>
                  );
                })}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[10, 25, 100]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </div>
  )
}

export default DataTable