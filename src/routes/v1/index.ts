import { Router } from 'express';
import { MiddlewareController } from 'src/controllers';
import authRouter from './AuthRouter';
import userRouter from './UserRouter';

const rotuesV1 = Router();

rotuesV1.use(authRouter);
rotuesV1.use(MiddlewareController.verify, userRouter);

export default rotuesV1;
