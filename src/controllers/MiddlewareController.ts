import { NextFunction, Request, Response } from 'express';
import { JWT } from 'src/middleware';

export const MiddlewareController = {
  verify: (req: Request, res: Response, next: NextFunction) => {
    JWT.verify(req, res, next);
  },
};
