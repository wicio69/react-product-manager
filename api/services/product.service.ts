import { Product } from '../../src/features/products/productSlice';
import { ProductModel } from '../models/product.model';

export const queryAllProducts = async () => {
  return ProductModel.find();
};

export const addProduct = async (product: Product) => {
  return product.save();
};
