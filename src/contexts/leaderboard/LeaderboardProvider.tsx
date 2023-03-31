import { useContext, useEffect, useState } from 'react';
import { getDocs } from 'firebase/firestore';

import { LeaderboardContext } from './LeaderboardContext';
import { UserContext } from 'contexts/user';
import { usersCollection } from 'lib/firebase';

import type { IUserLeaderboard } from 'types/leaderboard';
import type { IUser } from 'types/user';

type LeaderboardProviderProps = {
  children: React.ReactNode;
};

export const LeaderboardProvider = ({ children }: LeaderboardProviderProps) => {
  const [globals, setGlobals] = useState<IUserLeaderboard[]>([]);
  const [friends, setFriends] = useState<IUserLeaderboard[]>([]);
  const [isFetching, setIsFetching] = useState<boolean>(true);

  const userCtx = useContext(UserContext);

  useEffect(() => {
    const getAllUsers = async () => {
      const snapshot = await getDocs(usersCollection);
      const data = snapshot.docs.map((doc) => ({ ...(doc.data() as IUser) }));

      const globalUsers = data
        .sort((a, b) => b.progress.totalStars - a.progress.totalStars)
        .map((user, idx) => ({
          id: user.id,
          rank: idx + 1,
          name: user.name,
          avatar: user.avatar,
          frame: user.frame,
          totalStars: user.progress.totalStars,
        }));

      const friendUsers = data
        .sort((a, b) => b.progress.totalStars - a.progress.totalStars)
        .filter((user) => userCtx.user?.activity.following.includes(user.id))
        .map((user, idx) => ({
          id: user.id,
          rank: idx + 1,
          name: user.name,
          avatar: user.avatar,
          frame: user.frame,
          totalStars: user.progress.totalStars,
        }));

      setGlobals(globalUsers);
      setFriends(friendUsers);
      setIsFetching(false);
    };

    getAllUsers();
  }, [userCtx.user, isFetching]);

  return (
    <LeaderboardContext.Provider value={{ globals, friends }}>
      {children}
    </LeaderboardContext.Provider>
  );
};
