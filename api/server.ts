import express from 'express';
import { debugLogger } from '../api/util/logger';
import { connectDatabase } from './config/db';
import { logRequest } from './middleware/logRequest';
import { router as Products } from './routes/product.route';

const app = express();

app.use(express.json());

app.use(logRequest);
app.use('/products', Products);

app.listen(process.env.PORT, () => {
  connectDatabase();
  debugLogger.log('info', `Server listening on port ${process.env.PORT}`);
});
