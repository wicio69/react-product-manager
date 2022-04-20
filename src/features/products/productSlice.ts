import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';

const PRODUCT_SLICE_NAME: string = 'products';

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

export const getProducts = createAsyncThunk(
  `${PRODUCT_SLICE_NAME}/getProducts`,
  async () => {
    return fetch('http://hbalabkhmw.cdprojektred.com:3000/api/Products').then(
      (res) => res.json()
    );
  }
);

export const productSlice = createSlice({
  name: PRODUCT_SLICE_NAME,
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
      });
  },
});

export const { sortByColumn, setFilter } = productSlice.actions;

export const selectStatus = (state: RootState) => state.product.status;
export const selectFilter = (state: RootState) => state.product.filter;
export const selectAllProducts = (state: RootState) => {
  return state.product.products.filter((product) => {
    return product.name.trim().toLowerCase().includes(state.product.filter);
  });
};

export default productSlice.reducer;
