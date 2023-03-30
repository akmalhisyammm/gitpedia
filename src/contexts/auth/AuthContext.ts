import { createContext } from 'react';

import type { User } from 'firebase/auth';
import type { ILoginPayload, IRegisterPayload, IResetPasswordPayload } from 'types/auth';

interface IContext {
  user: User | null;
  register: (payload: IRegisterPayload) => Promise<void | null>;
  login: (payload: ILoginPayload) => Promise<void | null>;
  logout: () => Promise<void | null>;
  resetPassword: (payload: IResetPasswordPayload) => Promise<void | null>;
}

export const AuthContext = createContext<IContext>({
  user: null,
  register: async () => null,
  login: async () => null,
  logout: async () => null,
  resetPassword: async () => null,
});
