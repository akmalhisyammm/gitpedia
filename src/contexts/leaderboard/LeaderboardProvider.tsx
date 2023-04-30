import { useContext, useEffect, useState } from 'react';

import { LeaderboardContext } from './LeaderboardContext';
import { UserContext } from 'contexts/user';

import type { IUserLeaderboard } from 'types/leaderboard';

type LeaderboardProviderProps = {
  children: React.ReactNode;
};

export const LeaderboardProvider = ({ children }: LeaderboardProviderProps) => {
  const [globals, setGlobals] = useState<IUserLeaderboard[]>([]);
  const [friends, setFriends] = useState<IUserLeaderboard[]>([]);

  const userCtx = useContext(UserContext);

  const sortBy = (mode: 'total_stars' | 'total_exp') => {
    const sortedGlobals = globals
      .sort((a, b) => {
        const sortByMode =
          mode === 'total_stars'
            ? b.progress.totalStars - a.progress.totalStars
            : b.progress.totalExp - a.progress.totalExp;
        const sortByLastUpdated = a.progress.lastUpdated - b.progress.lastUpdated;

        return sortByMode !== 0 ? sortByMode : sortByLastUpdated;
      })
      .map((user, idx) => ({ ...user, rank: idx + 1 }));

    const sortedFriends = friends
      .sort((a, b) => {
        const sortByMode =
          mode === 'total_stars'
            ? b.progress.totalStars - a.progress.totalStars
            : b.progress.totalExp - a.progress.totalExp;
        const sortByLastUpdated = a.progress.lastUpdated - b.progress.lastUpdated;

        return sortByMode !== 0 ? sortByMode : sortByLastUpdated;
      })
      .map((user, idx) => ({ ...user, rank: idx + 1 }));

    setGlobals(sortedGlobals);
    setFriends(sortedFriends);
  };

  useEffect(() => {
    const getAllLeaderboards = async () => {
      const globalUsers = userCtx.users.map((user, idx) => ({ ...user, rank: idx + 1 }));

      const friendUsers = userCtx.users
        .filter((user) => userCtx.user?.friend.following.includes(user.id))
        .map((user, idx) => ({ ...user, rank: idx + 1 }));

      setGlobals(globalUsers);
      setFriends(friendUsers);
    };

    getAllLeaderboards();
  }, [userCtx.user, userCtx.users]);

  return (
    <LeaderboardContext.Provider value={{ globals, friends, sortBy }}>
      {children}
    </LeaderboardContext.Provider>
  );
};
