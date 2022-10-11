import { Router } from 'express';
import { AuthController } from 'src/controllers';

const authRouter = Router();

authRouter.post('/login', AuthController.loginUser);
authRouter.post('/register', AuthController.registerUser);

export default authRouter;
