import { Router } from 'express';
import authRouter from './AuthRouter';

const rotuesV1 = Router();

rotuesV1.use('/auth', authRouter);

export default rotuesV1;
