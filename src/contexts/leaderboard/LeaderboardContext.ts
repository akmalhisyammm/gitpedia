import { createContext } from 'react';

import type { IUserLeaderboard } from 'types/leaderboard';

interface IContext {
  globals: IUserLeaderboard[];
  friends: IUserLeaderboard[];
  sortBy: (mode: 'total_stars' | 'total_exp') => void | null;
}

export const LeaderboardContext = createContext<IContext>({
  globals: [],
  friends: [],
  sortBy: () => null,
});
