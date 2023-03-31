import { createContext } from 'react';

import type { IUserLeaderboard } from 'types/leaderboard';

interface IContext {
  globals: IUserLeaderboard[];
  friends: IUserLeaderboard[];
}

export const LeaderboardContext = createContext<IContext>({ globals: [], friends: [] });
