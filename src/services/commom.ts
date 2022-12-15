import { Request } from 'express';
import { get } from 'lodash';
import { USER_INFO_KEY } from 'src/constants';
import { UserInfoJWT } from 'src/types';

export const CommomService = {
  getUserInfo: (req: Request): UserInfoJWT => {
    return get(req, USER_INFO_KEY, {});
  },
};
