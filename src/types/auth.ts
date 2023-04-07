import { User } from 'firebase/auth';

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

export interface IVerifyPayload {
  oobCode: string;
}

export interface IRequestEmailVerificationPayload {
  user: User;
}

export interface IRequestResetPasswordPayload {
  email: string;
}

export interface IConfirmResetPasswordPayload extends IVerifyPayload {
  newPassword: string;
}
