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
import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import {
  tableWrapper,
  tableContainer,
  searchBar,
} from './Product.module.style';
import {
  selectAllProducts,
  setFilter,
  sortByColumn,
  getProducts,
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
  }, [products, dispatch]);

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(+event.target.value);
    setPage(DEFAULT_PAGE);
  };

  return (
    <Paper css={tableWrapper}>
      <TextField
        id="searchByProductName"
        label="Search products by name..."
        onChange={(e) => {
          dispatch(setFilter(e.target.value));
        }}
        variant="standard"
        css={searchBar}
      />
      <TableContainer css={tableContainer}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  onClick={() => dispatch(sortByColumn(column.id))}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
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
                    key={product.quantity}
                  >
                    {columns.map((column) => {
                      const value = product[column.id];
                      return (
                        <TableCell key={column.id} align={column.align}>
                          {column.format && typeof value === 'number'
                            ? column.format(value)
                            : value}
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
