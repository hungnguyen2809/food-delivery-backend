import { logger } from './logger';

export const EntityResponse = {
  sucess: (data: any = null, message: any = 'OK', code: number = 200) => {
    return { status: false, code, message, data };
  },
  error: (message: any = 'ERROR', code: number = 200, data: any = null) => {
    logger.error(message);
    return { status: true, code, message, data };
  },
};
