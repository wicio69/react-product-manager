import {
  ActionReducerMapBuilder,
  createSlice,
  PayloadAction,
} from '@reduxjs/toolkit';
import { RootState } from '../../util/store';
import {
  addProducts,
  deleteProducts,
  getProducts,
  updateProducts,
} from '../thunks/apiCalls';

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
    sortByColumn: (
      state: ProductsState,
      action: PayloadAction<keyof Product | undefined>
    ) => {
      state.sortColumn = action.payload;
    },
    setFilter: (state: ProductsState, action: PayloadAction<string>) => {
      state.filter = action.payload;
    },
    cancelUploaded: (state: ProductsState) => {
      state.isUploaded = false;
    },
    cancelRepeated: (state: ProductsState) => {
      state.isRepeated = false;
    },
  },
  extraReducers: (builder: ActionReducerMapBuilder<ProductsState>) => {
    builder
      .addCase(getProducts.pending, (state: ProductsState) => {
        state.status = Status.LOADING;
      })
      .addCase(
        getProducts.fulfilled,
        (state: ProductsState, action: PayloadAction<Product[]>) => {
          state.status = Status.SUCCEEDED;
          state.products = action.payload;
        }
      )
      .addCase(getProducts.rejected, (state: ProductsState) => {
        state.status = Status.ERROR;
      })
      .addCase(addProducts.pending, (state: ProductsState) => {
        state.status = Status.LOADING;
      })
      .addCase(addProducts.rejected, (state: ProductsState) => {
        state.isRepeated = true;
        state.status = Status.ERROR;
      })
      .addCase(addProducts.fulfilled, (state: ProductsState) => {
        state.isUploaded = true;
        state.status = Status.SUCCEEDED;
      })
      .addCase(deleteProducts.pending, (state: ProductsState) => {
        state.status = Status.LOADING;
      })
      .addCase(deleteProducts.rejected, (state: ProductsState) => {
        state.status = Status.ERROR;
      })
      .addCase(deleteProducts.fulfilled, (state: ProductsState) => {
        state.status = Status.SUCCEEDED;
      })
      .addCase(updateProducts.pending, (state: ProductsState) => {
        state.status = Status.LOADING;
      })
      .addCase(updateProducts.rejected, (state: ProductsState) => {
        state.isRepeated = true;
        state.status = Status.ERROR;
      })
      .addCase(updateProducts.fulfilled, (state: ProductsState) => {
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

export const { sortByColumn, setFilter, cancelUploaded, cancelRepeated } =
  productSlice.actions;

export default productSlice.reducer;
