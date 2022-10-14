import { Request, Response } from 'express';
import { UserModel } from 'src/models';
import { EntityResponse } from 'src/utils';

export const UserController = {
  getInfo: async (req: Request, res: Response) => {
    try {
      const { username } = req.query;
      if (!username) {
        return res.json(EntityResponse.error('username is required'));
      }

      const findUser = await UserModel.findOne({ username });
      if (!findUser) {
        return res.json(EntityResponse.error('User not found!. Username is wrong!'));
      }

      return res.json(EntityResponse.sucess(findUser));
    } catch (error: any) {
      return res.json(EntityResponse.error(error?.message));
    }
  },
};
