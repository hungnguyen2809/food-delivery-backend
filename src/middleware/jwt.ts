import dotenv from 'dotenv';
import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { split } from 'lodash';
import { HEADER_VERIFY_TOKEN, USER_INFO_KEY } from 'src/constants';
import { EntityResponse, logger } from 'src/utils';

dotenv.config();
const SECRET_KEY = process.env.SECRET_KEY;
const SECRET_KEY_REFRESH = process.env.SECRET_KEY_REFRESH;

export const JWT = {
  sign: (data = {}) => {
    if (!SECRET_KEY) {
      logger.warn('SECRET_KEY is undefined!');
      return '';
    }

    return jwt.sign(data, SECRET_KEY, { expiresIn: '1d' });
  },
  signRefresh: (data = {}) => {
    if (!SECRET_KEY_REFRESH) {
      logger.warn('SECRET_KEY_REFRESH is undefined!');
      return '';
    }

    return jwt.sign(data, SECRET_KEY_REFRESH, { expiresIn: '2d' });
  },
  verify: (req: Request, res: Response, next: NextFunction) => {
    const headerToken = req.header(HEADER_VERIFY_TOKEN);
    if (!headerToken) {
      return res.status(401).json(EntityResponse.error('You are not authenticated', 401));
    }

    try {
      const token = split(headerToken, ' ')[1];
      if (!token) {
        return res.status(403).json(EntityResponse.error('Invalid Token', 403));
      }

      const verified = jwt.verify(token, SECRET_KEY as string);

      //@ts-ignore
      req[USER_INFO_KEY] = verified; //gán thông tin đã xác thực cho request => các controller cần xử dụng không cần decode lại
      next();
    } catch (error) {
      return res.status(403).json(EntityResponse.error('Invalid Token', 403));
    }
  },
  verifyRefresh: (tokenRefresh: string) => {
    try {
      const verified: any = jwt.verify(tokenRefresh, SECRET_KEY_REFRESH as string);
      const { id, username, email, admin } = verified;
      return {
        token: JWT.sign({ id, username, email, admin }),
        refreshToken: JWT.signRefresh({ id, username, email, admin }),
      };
    } catch (error) {
      return {};
    }
  },
};
