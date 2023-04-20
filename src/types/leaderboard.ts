import type { IUser } from './user';

export interface IUserLeaderboard extends IUser {
  rank: number;
}
