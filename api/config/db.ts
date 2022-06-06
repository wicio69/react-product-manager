import { config } from 'dotenv';
import { connect } from 'mongoose';

// Loads and prepares .env variables:
config();

const MONGO_DB_URL = process.env.DB_URL || 'development';

export const connectDatabase = () =>
  connect(MONGO_DB_URL).catch((error: Error) => {
    console.log(error);
  });
