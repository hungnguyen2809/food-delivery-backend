import { Router } from 'express';
import { FoodController } from 'src/controllers';

const foodRouter = Router();

foodRouter.get('/food/:foodId', FoodController.getById);

export default foodRouter;
