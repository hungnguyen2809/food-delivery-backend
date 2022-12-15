export type UserInfoJWT = {
  id?: string;
  username?: string;
  email?: string;
  admin?: boolean;
  fullname?: string;
  active?: boolean;
};

export type RefreshTokenType = {
  username: string;
  token: string;
};
