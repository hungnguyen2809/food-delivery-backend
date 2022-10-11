import { logger } from './logger';

export const EntityResponse = {
  sucess: (data: any = null, message: any = 'OK', status: number = 200) => {
    return { error: false, status, message, data };
  },
  error: (message: any = 'ERROR', status: number = 200, data: any = null) => {
    logger.error(message);
    return { error: true, status, message, data };
  },
};
