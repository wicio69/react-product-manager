import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../util/store';
import {
  addProducts,
  deleteProducts,
  getProducts,
  updateProducts,
} from './apiCalls';

export enum TypePrefix {
  BASE = 'products',
  ADD = 'products/addProducts',
  GET = 'products/getProducts',
  DELETE = 'products/deleteProducts',
  UPDATE = 'products/updateProducts',
}

export enum Status {
  LOADING = 'loading',
  ERROR = 'error',
  IDLE = 'idle',
  SUCCEEDED = 'succeded',
}

export interface ProductsState {
  products: Product[];
  status: Status.LOADING | Status.ERROR | Status.IDLE | Status.SUCCEEDED;
  filter: string;
  sortColumn: keyof Product | undefined;
  isRepeated: boolean;
  isUploaded: boolean;
}

export interface Product {
  name: string;
  quantity: number;
  date: Date;
  description: string;
  email: string;
  id: number;
}

export const initialState: ProductsState = {
  products: [],
  filter: '',
  sortColumn: undefined,
  status: Status.IDLE,
  isRepeated: false,
  isUploaded: false,
};

export const productSlice = createSlice({
  name: TypePrefix.BASE,
  initialState: initialState,
  reducers: {
    sortByColumn: (state, action) => {
      state.sortColumn = action.payload;
    },
    setFilter: (state, action) => {
      state.filter = action.payload;
    },
    cancelUploaded: (state) => {
      state.isUploaded = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getProducts.pending, (state) => {
        state.status = Status.LOADING;
      })
      .addCase(getProducts.fulfilled, (state, action) => {
        state.status = Status.SUCCEEDED;
        state.products = action.payload;
      })
      .addCase(getProducts.rejected, (state) => {
        state.status = Status.ERROR;
      })
      .addCase(addProducts.pending, (state) => {
        state.status = Status.LOADING;
      })
      .addCase(addProducts.rejected, (state) => {
        state.isRepeated = true;
        state.status = Status.ERROR;
      })
      .addCase(addProducts.fulfilled, (state) => {
        state.isUploaded = true;
        state.status = Status.SUCCEEDED;
      })
      .addCase(deleteProducts.pending, (state) => {
        state.status = Status.LOADING;
      })
      .addCase(deleteProducts.rejected, (state) => {
        state.status = Status.ERROR;
      })
      .addCase(deleteProducts.fulfilled, (state) => {
        state.status = Status.SUCCEEDED;
      })
      .addCase(updateProducts.pending, (state) => {
        state.status = Status.LOADING;
      })
      .addCase(updateProducts.rejected, (state) => {
        state.status = Status.ERROR;
      })
      .addCase(updateProducts.fulfilled, (state) => {
        state.status = Status.SUCCEEDED;
      });
  },
});

export const selectIsUploaded = (state: RootState) => state.product.isUploaded;
export const selectIsRepeated = (state: RootState) => state.product.isRepeated;
export const selectStatus = (state: RootState) => state.product.status;
export const selectFilter = (state: RootState) => state.product.filter;
export const selectAllProducts = (state: RootState) => {
  const sortByKey = (key: keyof Product) => (a: Product, b: Product) =>
    a[key] > b[key] ? 1 : -1;
  const filtered = state.product.products.filter((product) => {
    return product.name
      .trim()
      .toLowerCase()
      .includes(state.product.filter.toLowerCase());
  });

  if (state.product.sortColumn === undefined) {
    return filtered;
  }

  return filtered.sort(sortByKey(state.product.sortColumn));
};

export const { sortByColumn, setFilter, cancelUploaded } = productSlice.actions;

export default productSlice.reducer;
