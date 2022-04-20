import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../util/store';
import { addProducts, deleteProducts, getProducts } from './apiCalls';

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
  filter: string;
  status: Status.LOADING | Status.ERROR | Status.IDLE | Status.SUCCEEDED;
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
  status: Status.IDLE,
};

export const productSlice = createSlice({
  name: TypePrefix.BASE,
  initialState: initialState,
  reducers: {
    sortByColumn: (state, action: PayloadAction<keyof Product>) => {
      const sortByKey = (key: keyof Product) => (a: Product, b: Product) =>
        a[key] > b[key] ? 1 : -1;
      const sorted = state.products.slice().sort(sortByKey(action.payload));
      state.products = sorted;
    },
    setFilter: (state, action) => {
      state.filter = action.payload;
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
        state.status = Status.ERROR;
      })
      .addCase(addProducts.fulfilled, (state) => {
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
      });
  },
});

export const selectStatus = (state: RootState) => state.product.status;
export const selectFilter = (state: RootState) => state.product.filter;
export const selectAllProducts = (state: RootState) => {
  return state.product.products.filter((product) => {
    return product.name
      .trim()
      .toLowerCase()
      .includes(state.product.filter.toLowerCase());
  });
};

export const { sortByColumn, setFilter } = productSlice.actions;

export default productSlice.reducer;
