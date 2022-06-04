import { connect } from 'mongoose';

export const connectDatabase = await connect(process.env.DB_URL);
