import { Router } from 'express';
import { RestaurentController, UserController } from 'src/controllers';

const restaurentRouter = Router();

restaurentRouter.get('/restaurent/get-all', RestaurentController.getAll);
restaurentRouter.get('/restaurent/get-by-id/:restaurantId', RestaurentController.getById);

export default restaurentRouter;
