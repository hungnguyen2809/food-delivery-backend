import { Router } from 'express';
import { UserController } from 'src/controllers';

const userRouter = Router();

userRouter.get('/user/get-info', UserController.getInfo);
userRouter.post('/user/update-info', UserController.updateUser);

export default userRouter;
