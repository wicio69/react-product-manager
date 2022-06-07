import express, { Router } from 'express';
import {
  deleteProduct,
  getAllProducts,
  postProduct,
} from '../controllers/product.controller';

export const router: Router = express.Router();

/**
 * @route GET /api/products
 * @description Gets all products
 * @access Public
 */
router.get('/', getAllProducts);

/**
 * @route POST /api/products
 * @description Adds a product
 * @access Public (for now)
 */
router.post('/', postProduct);

/**
 * @route DELETE /api/products/:productId
 * @description Deletes a product
 * @access Public
 */
router.put('/', deleteProduct);

// /**
//  * @route PUT /api/products/:productId
//  * @description Updates a product
//  * @access Public
//  */
// router.put('/', null);
