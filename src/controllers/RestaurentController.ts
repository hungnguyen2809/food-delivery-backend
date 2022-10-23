import { Request, Response } from 'express';
import { RestaurantsModel } from 'src/models';
import { EntityResponse } from 'src/utils';

export const RestaurentController = {
  getAll: async (req: Request, res: Response) => {
    try {
      const allRes = await RestaurantsModel.find();

      return res.json(EntityResponse.sucess(allRes));
    } catch (error: any) {
      return res.json(EntityResponse.error(error?.message));
    }
  },
  getById: async (req: Request, res: Response) => {
    try {
      const { restaurantId } = req.params;
      if (!restaurantId) {
        return res.json(EntityResponse.error('id is required'));
      }

      const findRes = await RestaurantsModel.aggregate([
        {
          $match: { id: restaurantId },
        },
        {
          $lookup: {
            as: 'foods',
            from: 'foods',
            localField: 'id',
            foreignField: 'restaurantId',
          },
        },
      ]);
      if (!findRes || findRes.length === 0) {
        return res.json(EntityResponse.error('Restaurant not found!'));
      }

      return res.json(EntityResponse.sucess(findRes[0]));
    } catch (error: any) {
      return res.json(EntityResponse.error(error?.message));
    }
  },
};
