import dotenv from 'dotenv';
import mongoose from 'mongoose';
import { logger } from 'src/utils';

dotenv.config();
const MONGODB_URL = process.env.MONGODB_URL;

const connection = mongoose.connection;

const connect = (callback?: () => void) => {
  if (!MONGODB_URL) {
    logger.warn('URL Mongo is undefined: ', MONGODB_URL);
    return;
  }

  return mongoose.connect(MONGODB_URL, (error) => {
    if (error) {
      logger.warn('Connected MongoDB Error: ', error.message);
      return;
    }
    logger.log('Connected MongoDB');
    callback?.();
  });
};

export const MONGO_DB = {
  connect,
  connection,
};
