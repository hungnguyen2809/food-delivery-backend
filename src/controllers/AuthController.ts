import bcrypt from 'bcrypt';
import { Request, Response } from 'express';
import { JWT } from 'src/middleware';
import { UserModel } from 'src/models';
import { EntityResponse } from 'src/utils';

const listRefreshToken: string[] = [];

export const AuthController = {
  /** Register User */
  registerUser: async (req: Request, res: Response) => {
    try {
      const { username, password, email } = req.body;

      if (!username || !password || !email) {
        return res.json(EntityResponse.error('username, password, email is required'));
      }

      const salt = await bcrypt.genSalt(10);
      const hashed = await bcrypt.hash(password, salt);

      const newUser = new UserModel({ username, email, password: hashed });
      const user = await newUser.save();

      return res.json(EntityResponse.sucess(user));
    } catch (error) {
      return res.json(EntityResponse.error(error));
    }
  },
  /** Login User */
  loginUser: async (req: Request, res: Response) => {
    try {
      const { username, password } = req.body;
      if (!username || !password) {
        return res.json(EntityResponse.error('username, password is required'));
      }

      const user = await UserModel.findOne({ username });
      if (!user) {
        return res.json(EntityResponse.error('User not found!. Username is wrong!'));
      }

      const validPassword = await bcrypt.compare(password, user.password);
      if (!validPassword) {
        return res.json(EntityResponse.error('Password is wrong!'));
      }

      const { email, id, admin } = user;
      const token = JWT.sign({ id, username, email, admin });
      const refreshToken = JWT.signRefresh({ id, username, email, admin });

      listRefreshToken.push(refreshToken);

      return res.json(EntityResponse.sucess({ id, username, admin, email, token, refreshToken }));
    } catch (error) {
      return res.json(EntityResponse.error(error));
    }
  },
};
