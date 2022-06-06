import { config } from 'dotenv';
import { connect } from 'mongoose';

config();

const MONGO_DB_URL: string = process.env.DB_URL || 'development';

export const connectDatabase: () => void = () =>
  connect(MONGO_DB_URL).catch((error: Error) => {
    console.log(error);
  });
