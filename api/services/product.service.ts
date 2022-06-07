import { Product } from '../../src/features/products/productSlice';
import { ProductModel } from '../models/product.model';

export const selectAllProducts = async () => {
  return await ProductModel.find();
};

export const insertProduct = async (product: Product) => {
  await new ProductModel(product).save();
};

export const deleteProductById = async (productId: number) => {
  return await ProductModel.deleteOne((product: Product) => {
    return product.id === productId;
  });
};
