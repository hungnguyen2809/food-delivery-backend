import { Router } from 'express';
import { MiddlewareController } from 'src/controllers';
import authRouter from './AuthRouter';
import cartRouter from './CartRouter';
import foodRouter from './FoodRouter';
import restaurentRouter from './RestaurentRouter';
import userRouter from './UserRouter';

const rotuesV1 = Router();

rotuesV1.use(authRouter);
rotuesV1.use(MiddlewareController.verify, userRouter);
rotuesV1.use(MiddlewareController.verify, cartRouter);
rotuesV1.use(MiddlewareController.verify, restaurentRouter);
rotuesV1.use(MiddlewareController.verify, foodRouter);

export default rotuesV1;
