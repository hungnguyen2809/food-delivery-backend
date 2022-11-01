import { Request, Response } from 'express';
import { get } from 'lodash';
import { CartModel } from 'src/models';
import { EntityResponse } from 'src/utils';

export const CartController = {
  getCartItems: async (req: Request, res: Response) => {
    try {
      const userId = get(req, 'userInfo.username');
      const cartItems = await CartModel.aggregate([
        { $match: { userId } },
        { $lookup: { from: 'foods', as: 'food', localField: 'foodId', foreignField: 'id' } },
        { $unwind: { path: '$food' } },
      ]);

      const itemsTotal = cartItems
        .map((item) => item?.food?.price * item?.quantity)
        .reduce((total, price) => total + price, 0);

      const discount = 0;

      return res.json(
        EntityResponse.sucess({
          meta: { itemsTotal, discount, grandTotal: itemsTotal - discount },
          data: cartItems,
        })
      );
    } catch (error: any) {
      return res.json(EntityResponse.error(error?.message));
    }
  },
  addToCart: async (req: Request, res: Response) => {
    try {
      const { foodId } = req.body;
      const userId = get(req, 'userInfo.username');

      if (!foodId || !userId) {
        return res.json(EntityResponse.error('foodId is required'));
      }

      await CartModel.updateOne({ foodId, userId }, { $inc: { quantity: 1 } }, { upsert: true });

      return res.json(EntityResponse.sucess(null, 'Add to cart sucess'));
    } catch (error: any) {
      return res.json(EntityResponse.error(error?.message));
    }
  },
  removeFormCart: async (req: Request, res: Response) => {
    try {
      const { foodId } = req.body;
      const userId = get(req, 'userInfo.username');

      if (!foodId || !userId) {
        return res.json(EntityResponse.error('foodId is required'));
      }

      //when remove item to cart check if quantity is 1 => we are delete record
      const findCartDelete = await CartModel.findOne({ userId, foodId, quantity: 1 });
      if (findCartDelete) {
        await CartModel.deleteOne({ userId, foodId });
        return res.json(EntityResponse.sucess(null, 'Delete cart success'));
      }

      const findCartRemove = await CartModel.findOne({ userId, foodId });
      if (findCartRemove) {
        await CartModel.updateOne({ foodId, userId }, { $inc: { quantity: -1 } }, { upsert: true });
        return res.json(EntityResponse.sucess(null, 'Remove from cart sucess'));
      }

      return res.json(EntityResponse.sucess(null, 'Can not remove item when cart empty'));
    } catch (error: any) {
      return res.json(EntityResponse.error(error?.message));
    }
  },
};
