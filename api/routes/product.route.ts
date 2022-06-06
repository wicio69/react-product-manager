import express, { Router } from 'express';
import { getAllProducts } from '../controllers/product.controller';

export const router: Router = express.Router();

/**
 * @route GET /api/products
 * @description Gets all products
 * @access Public
 */
router.get('/', getAllProducts);
