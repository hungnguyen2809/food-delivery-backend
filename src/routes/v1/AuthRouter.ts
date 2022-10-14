import { Router } from 'express';
import { AuthController } from 'src/controllers';

const authRouter = Router();

authRouter.post('/auth/login', AuthController.loginUser);
authRouter.post('/auth/register', AuthController.registerUser);

export default authRouter;
