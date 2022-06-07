import { Request, Response } from 'express';
import {
  deleteProductById,
  insertProduct,
  selectAllProducts,
} from '../services/product.service';
import { debugLogger } from '../util/logger';

export const getAllProducts = async (req: Request, res: Response) => {
  debugLogger.log('info', JSON.stringify(req.body));
  res.status(200).json(await selectAllProducts());
};

export const postProduct = async (req: Request, res: Response) => {
  const product = req.body;
  if (!product) {
    debugLogger.log('error', 'No product found in request body.');
    res.status(400).send('Incorrect product');
  }
  await insertProduct(product);
  res.status(201).send('Product added.');
};

export const deleteProduct = async (req: Request, res: Response) => {
  debugLogger.log('info', JSON.stringify(req.body));
  const { productId } = req.body;
  await deleteProductById(productId);
  res.status(200).send('Product deleted');
};
