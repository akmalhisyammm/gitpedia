export interface ILoginPayload {
  email: string;
  password: string;
}

export interface IRegisterPayload {
  name: string;
  occupation: string;
  gender: 'male' | 'female';
  email: string;
  password: string;
}

export interface IResetPasswordPayload {
  email: string;
}
