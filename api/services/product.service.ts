import { ProductModel } from '../models/product.model';

export const getProducts = async () => {
  return ProductModel.find();
};
