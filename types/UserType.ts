export interface ILogin {
  id: string;
  password: string;
}

export interface ILoginResponse {
  authenticated: boolean;
  currentUser: IUser;
}

export interface ISignup {
  inviteCode: string;
  id: string;
  password: string;
  passwordConfirm: string;
  nickname: string;
}

export interface IUser {
  id: string;
  userId: string;
  nickname: string;
  profileImgUrl: string | null;
  introduction: string | null;
}
