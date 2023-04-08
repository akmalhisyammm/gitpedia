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

  const userCtx = useContext(UserContext);

  useEffect(() => {
    const getAllUsers = async () => {
      const snapshot = await getDocs(usersCollection);
      const data = snapshot.docs.map((doc) => ({ ...(doc.data() as IUser) }));

      const globalUsers = data
        .sort((a, b) => {
          const sortedTotalStars = b.progress.totalStars - a.progress.totalStars;
          const sortedLastUpdated = a.progress.lastUpdated - b.progress.lastUpdated;

          return sortedTotalStars !== 0 ? sortedTotalStars : sortedLastUpdated;
        })
        .map((user, idx) => ({
          id: user.id,
          rank: idx + 1,
          name: user.profile.name,
          occupation: user.profile.occupation,
          gender: user.profile.gender,
          avatar: user.profile.avatar,
          frame: user.profile.frame,
          following: user.activity.following,
          followers: user.activity.followers,
          totalStars: user.progress.totalStars,
          socials: user.profile.socials,
        }));

      const friendUsers = data
        .sort((a, b) => {
          const sortedTotalStars = b.progress.totalStars - a.progress.totalStars;
          const sortedLastUpdated = a.progress.lastUpdated - b.progress.lastUpdated;

          return sortedTotalStars !== 0 ? sortedTotalStars : sortedLastUpdated;
        })
        .filter((user) => userCtx.user?.activity.following.includes(user.id))
        .map((user, idx) => ({
          id: user.id,
          rank: idx + 1,
          name: user.profile.name,
          occupation: user.profile.occupation,
          gender: user.profile.gender,
          avatar: user.profile.avatar,
          frame: user.profile.frame,
          following: user.activity.following,
          followers: user.activity.followers,
          totalStars: user.progress.totalStars,
          socials: user.profile.socials,
        }));

      setGlobals(globalUsers);
      setFriends(friendUsers);
    };

    getAllUsers();
  }, [userCtx.user, userCtx.user?.profile, userCtx.user?.progress]);

  return (
    <LeaderboardContext.Provider value={{ globals, friends }}>
      {children}
    </LeaderboardContext.Provider>
  );
};
