import { ProductModel } from '../models/product.model';

export const queryAllProducts = async () => {
  return ProductModel.find();
};
