import { Request, Response } from 'express';
import { UserModel } from 'src/models';
import { CommomService } from 'src/services';
import { EntityResponse } from 'src/utils';

export const UserController = {
  getInfo: async (req: Request, res: Response) => {
    try {
      const { username } = req.query;
      if (!username) {
        return res.json(EntityResponse.error('username is required'));
      }

      const fields = ['id', 'username', 'fullname', 'active', 'email', 'admin'];
      const findUser = await UserModel.findOne({ username }).select(fields);
      if (!findUser) {
        return res.json(EntityResponse.error('User not found!. Username is wrong!'));
      }

      return res.json(EntityResponse.sucess(findUser));
    } catch (error: any) {
      return res.json(EntityResponse.error(error?.message));
    }
  },
  updateUser: async (req: Request, res: Response) => {
    try {
      const userInfo = CommomService.getUserInfo(req);
      const { fullname, active } = req.body;

      const findUser = await UserModel.findOne({ username: userInfo.username });
      if (!findUser) {
        return res.json(EntityResponse.error('User not found!'));
      }

      if (!fullname) {
        return res.json(EntityResponse.error('fullname is required'));
      }

      await findUser.updateOne({ $set: { fullname, active } });
      return res.json(EntityResponse.sucess());
    } catch (error: any) {
      return res.json(EntityResponse.error(error?.message));
    }
  },
};
