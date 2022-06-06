import express from 'express';
import { connectDatabase } from './config/db';
import { ProductModel } from './models/product.model';
import { router as Products } from './routes/product.route';

const app = express();

app.use('/products', Products);

app.listen(process.env.PORT, async () => {
  await connectDatabase();
  const product = new ProductModel({
    id: 1,
    email: 'mongo@mongo.mongo',
    description: 'test',
    name: 'test2',
    quantity: 250,
    date: new Date(),
  });
  console.log(`[INFO] Server listening on port ${process.env.PORT}`);
});
