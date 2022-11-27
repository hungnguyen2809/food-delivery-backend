import { Request, Response } from 'express';
import { FoodsModel } from 'src/models';
import { EntityResponse } from 'src/utils';

export const FoodController = {
  getAll: async (req: Request, res: Response) => {
    try {
      const allFodds = await FoodsModel.find();

      return res.json(EntityResponse.sucess(allFodds));
    } catch (error: any) {
      return res.json(EntityResponse.error(error?.message));
    }
  },
  getById: async (req: Request, res: Response) => {
    try {
      const { foodId } = req.params;
      if (!foodId) {
        return res.json(EntityResponse.error('id is required'));
      }

      const findFood = await FoodsModel.findOne({ id: foodId });
      if (!findFood) {
        return res.json(EntityResponse.error('Food not found!'));
      }

      return res.json(EntityResponse.sucess(findFood));
    } catch (error: any) {
      return res.json(EntityResponse.error(error?.message));
    }
  },
};
