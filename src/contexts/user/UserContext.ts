import { createContext } from 'react';

import type {
  IOtherUserActivity,
  IUser,
  IUserActivity,
  IUserItem,
  IUserProfile,
  IUserProgress,
} from 'types/user';

interface IContext {
  user: IUser | null;
  addItem: (payload: IUserItem) => Promise<void | null>;
  updateActivity: (
    selfPayload: IUserActivity,
    othersPayload: IOtherUserActivity
  ) => Promise<void | null>;
  updateProgress: (payload: IUserProgress) => Promise<void | null>;
  updateProfile: (payload: IUserProfile) => Promise<void | null>;
}

export const UserContext = createContext<IContext>({
  user: null,
  addItem: async () => null,
  updateActivity: async () => null,
  updateProgress: async () => null,
  updateProfile: async () => null,
});
