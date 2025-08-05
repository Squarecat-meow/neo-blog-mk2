export interface ILogin {
  id: string;
  password: string;
}

export interface ISignup {
  inviteCode: string;
  id: string;
  password: string;
  passwordConfirm: string;
  nickname: string;
}

export interface IUser {
  id: number;
  userId: string;
  password: string;
  nickname: string;
  profileImgUrl: string | null;
  introduction: string | null;
}
