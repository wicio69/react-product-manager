import { Request, Response } from 'express';
import { queryAllProducts } from '../services/product.service';
import { debugLogger } from '../util/logger';

export const getAllProducts = async (_req: Request, res: Response) => {
  const products = queryAllProducts();
  return res.status(200).json(products);
};

export const addProduct = async (req: Request, res: Response) => {
  const { product } = req.body.product;
  if (!product) {
    debugLogger.log('error', 'No product found in request body.');
    res.status(400).send('Incorrect product');
  }
};
