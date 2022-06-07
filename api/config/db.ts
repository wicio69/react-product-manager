import { config } from 'dotenv';
import { connect } from 'mongoose';
import { debugLogger } from '../util/logger';

config();

const MONGO_DB_URL: string = process.env.DB_URL || 'development';

export const connectDatabase: () => void = () => {
  connect(MONGO_DB_URL)
    .then(() => debugLogger.log('info', 'Connected to MongoDB'))
    .catch((error: Error) => debugLogger.log('error', error));
};
