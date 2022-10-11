import { logger } from './logger';

export const EntityResponse = {
  sucess: (data: any = {}, message: any = 'OK', status: number = 200) => {
    return { error: false, status, message, data };
  },
  error: (message: any = 'OK', status: number = 200, data: any = null) => {
    logger.error(message);
    return { error: true, status, message, data };
  },
};
