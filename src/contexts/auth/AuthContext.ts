import { createContext } from 'react';

import type { User } from 'firebase/auth';
import type {
  ILoginPayload,
  IRegisterPayload,
  IRequestResetPasswordPayload,
  IVerifyPayload,
  IConfirmResetPasswordPayload,
} from 'types/auth';

interface IContext {
  user: User | null;
  register: (payload: IRegisterPayload) => Promise<void | null>;
  login: (payload: ILoginPayload) => Promise<void | null>;
  logout: () => Promise<void | null>;
  verifyEmail: (payload: IVerifyPayload) => Promise<void | null>;
  verifyResetPassword: (payload: IVerifyPayload) => Promise<string | undefined>;
  requestEmailVerification: (payload: ILoginPayload) => Promise<void | null>;
  requestResetPassword: (payload: IRequestResetPasswordPayload) => Promise<void | null>;
  confirmResetPassword: (payload: IConfirmResetPasswordPayload) => Promise<void | null>;
}

export const AuthContext = createContext<IContext>({
  user: null,
  register: async () => null,
  login: async () => null,
  logout: async () => null,
  verifyEmail: async () => null,
  verifyResetPassword: async () => undefined,
  requestEmailVerification: async () => null,
  requestResetPassword: async () => null,
  confirmResetPassword: async () => null,
});
