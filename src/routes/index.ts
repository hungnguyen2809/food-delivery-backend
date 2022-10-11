import { Router } from 'express';
import rotuesV1 from './v1';
import rotuesV2 from './v2';

const rotues = Router();

rotues.use('/v1', rotuesV1);
rotues.use('/v2', rotuesV2);

export default rotues;
