import { model, Schema } from 'mongoose';
import { Product } from '../../src/features/products/productSlice';

const productSchema = new Schema<Product>({
  id: { type: Number, required: true },
  email: { type: String, required: true },
  description: { type: String, required: true },
  name: { type: String, required: true },
  quantity: { type: Number, required: true },
  date: { type: Date, required: true },
});

export const ProductModel = model<Product>('Product', productSchema);
