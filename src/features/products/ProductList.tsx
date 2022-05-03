/** @jsxImportSource @emotion/react */
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../util/hooks';
import { DeletePopup } from './DeletePopup';
import { EditPopup } from './EditPopup';
import { AddPopup } from './AddPopup';
import { tableWrapper, searchBar, tableHeader } from './Product.module.style';
import { getProducts } from './apiCalls';
import {
  selectAllProducts,
  setFilter,
  sortByColumn,
  selectStatus,
  Status,
} from './productSlice';

interface Column {
  id: 'name' | 'quantity' | 'date' | 'description' | 'email' | 'id';
  label: string;
  minWidth?: number;
  align?: 'right';
  format?: (value: number) => string;
}

const columns: readonly Column[] = [
  { id: 'name', label: 'Name', minWidth: 170 },
  { id: 'quantity', label: 'Quantity', minWidth: 100 },
  {
    id: 'date',
    label: 'Date',
    minWidth: 170,
    align: 'right',
    format: (value: number) => value.toLocaleString('en-US'),
  },
  {
    id: 'description',
    label: 'Description',
    minWidth: 170,
    align: 'right',
    format: (value: number) => value.toLocaleString('en-US'),
  },
  {
    id: 'email',
    label: 'Email',
    minWidth: 170,
    align: 'right',
    format: (value: number) => value.toFixed(2),
  },
  {
    id: 'id',
    label: '#',
    minWidth: 170,
    align: 'right',
    format: (value: number) => value.toFixed(2),
  },
];

export function ProductList() {
  const [page, setPage] = useState<number>(0);
  const [rowsPerPage, setRowsPerPage] = useState<number>(10);
  const dispatch = useAppDispatch();
  const products = useAppSelector(selectAllProducts);
  const productsStatus = useAppSelector(selectStatus);
  const DEFAULT_PAGE: number = 0;

  const handleChangePage = (_event: unknown, newPage: number) => {
    setPage(newPage);
  };

  useEffect(() => {
    if (productsStatus !== Status.SUCCEEDED) dispatch(getProducts());
  }, [products, dispatch, productsStatus]);

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(+event.target.value);
    setPage(DEFAULT_PAGE);
  };

  return (
    <Paper css={tableWrapper}>
      <AddPopup />
      <TextField
        id="searchByProductName"
        label="Search products by name..."
        onChange={(e) => {
          setPage(DEFAULT_PAGE);
          dispatch(setFilter(e.target.value));
        }}
        variant="standard"
        css={searchBar}
      />
      <TableContainer>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  css={tableHeader}
                  key={column.id}
                  align={column.align}
                  onClick={() => dispatch(sortByColumn(column.id))}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
              <TableCell />
            </TableRow>
          </TableHead>
          <TableBody>
            {products
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((product) => {
                return (
                  <TableRow
                    hover
                    role="checkbox"
                    tabIndex={-1}
                    key={product.id}
                  >
                    {columns.map((column) => {
                      var value = product[column.id].toString();
                      if (column.id === 'date') {
                        value = new Date(value).toDateString();
                      }
                      return (
                        <TableCell key={column.id} align={column.align}>
                          {column.format && typeof value === 'number'
                            ? column.format(value)
                            : value}
                        </TableCell>
                      );
                    })}
                    <TableCell>
                      <DeletePopup id={product.id} productName={product.name} />
                      <EditPopup
                        id={product.id}
                        name={product.name}
                        description={product.description}
                        quantity={product.quantity}
                        email={product.email}
                        date={product.date}
                      />
                    </TableCell>
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 15, 30]}
        component="div"
        count={products.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
}
