import { Router } from 'express';
import { CartController } from 'src/controllers';

const cartRouter = Router();

cartRouter.get('/cart', CartController.getCartItems);
cartRouter.post('/cart/add', CartController.addToCart);
cartRouter.delete('/cart/remove', CartController.removeFormCart);

export default cartRouter;
