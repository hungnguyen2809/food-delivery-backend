import { Router } from 'express';
import { UserController } from 'src/controllers';

const userRouter = Router();

userRouter.get('/user/get-info', UserController.getInfo);

export default userRouter;
