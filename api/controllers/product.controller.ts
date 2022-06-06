import { Request, Response } from 'express';
import { queryAllProducts } from '../services/product.service';

export const getAllProducts = async (req: Request, res: Response) => {
  const products = queryAllProducts();
  return res.json(products);
};
