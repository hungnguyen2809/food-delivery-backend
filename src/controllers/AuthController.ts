import bcrypt from 'bcrypt';
import { Request, Response } from 'express';
import { JWT } from 'src/middleware';
import { UserModel } from 'src/models';
import { EntityResponse } from 'src/utils';

// let listRefreshToken: RefreshTokenType[] = [];

export const AuthController = {
  /** Register User */
  registerUser: async (req: Request, res: Response) => {
    try {
      const { username, password, fullname, email } = req.body;

      if (!username || !password || !email || !fullname) {
        return res.json(EntityResponse.error('username, password, fullname, email is required'));
      }

      const findUser = await UserModel.findOne({ username });
      if (findUser) {
        return res.json(EntityResponse.error('username already exists'));
      }

      const findEmail = await UserModel.findOne({ email });
      if (findEmail) {
        return res.json(EntityResponse.error('email already exists'));
      }

      const salt = await bcrypt.genSalt(10);
      const hashed = await bcrypt.hash(password, salt);

      const newUser = new UserModel({ username, fullname, email, password: hashed });
      const user = await newUser.save();

      return res.json(EntityResponse.sucess(user));
    } catch (error: any) {
      return res.json(EntityResponse.error(error?.message));
    }
  },
  /** Login User */
  loginUser: async (req: Request, res: Response) => {
    try {
      const { username, password } = req.body;
      if (!username || !password) {
        return res.json(EntityResponse.error('username, password is required'));
      }

      const findUser = await UserModel.findOne({ username });
      if (!findUser) {
        return res.json(EntityResponse.error('User not found!. Username is wrong!'));
      }
      if (!findUser.active) {
        return res.json(
          EntityResponse.error('User has blocked!. Please contact with Center Service!')
        );
      }

      const validPassword = await bcrypt.compare(password, findUser.password);
      if (!validPassword) {
        return res.json(EntityResponse.error('Password is wrong!'));
      }

      const { email, id, admin, fullname, active } = findUser;
      const token = JWT.sign({ id, username, email, admin, fullname, active });
      const refreshToken = JWT.signRefresh({ id, username, email, admin, fullname, active });

      // listRefreshToken.push({ username: username, token: refreshToken });

      return res.json(
        EntityResponse.sucess({ id, username, email, admin, fullname, active, token, refreshToken })
      );
    } catch (error: any) {
      return res.json(EntityResponse.error(error?.message));
    }
  },
  /** Login User */
  logoutUser: async (req: Request, res: Response) => {
    try {
      const { username } = req.body;
      if (!username) {
        return res.json(EntityResponse.error('username is required'));
      }

      // listRefreshToken = listRefreshToken.filter((token) => token.username !== username);

      return res.json(EntityResponse.sucess());
    } catch (error: any) {
      return res.json(EntityResponse.error(error?.message));
    }
  },
};
