import { createContext } from 'react';

import type {
  IOtherUserFriend,
  IUser,
  IUserFriend,
  IUserItem,
  IUserProfile,
  IUserProgress,
} from 'types/user';

interface IContext {
  user: IUser | null;
  users: IUser[];
  getAllUsers: () => Promise<void | null>;
  getAuthUser: () => Promise<void | null>;
  addItem: (payload: IUserItem) => Promise<void | null>;
  updateFriend: (selfPayload: IUserFriend, othersPayload: IOtherUserFriend) => Promise<void | null>;
  updateProgress: (payload: IUserProgress) => Promise<void | null>;
  updateProfile: (payload: IUserProfile) => Promise<void | null>;
}

export const UserContext = createContext<IContext>({
  user: null,
  users: [],
  getAllUsers: async () => null,
  getAuthUser: async () => null,
  addItem: async () => null,
  updateFriend: async () => null,
  updateProgress: async () => null,
  updateProfile: async () => null,
});
