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

  const sortBy = (mode: 'total_stars' | 'total_exp') => {
    const sortedGlobals = globals
      .sort((a, b) => {
        const sortByMode =
          mode === 'total_stars' ? b.totalStars - a.totalStars : b.totalExp - a.totalExp;
        const sortByLastUpdated = a.lastUpdated - b.lastUpdated;

        return sortByMode !== 0 ? sortByMode : sortByLastUpdated;
      })
      .map((user, idx) => ({ ...user, rank: idx + 1 }));

    const sortedFriends = friends
      .sort((a, b) => {
        const sortByMode =
          mode === 'total_stars' ? b.totalStars - a.totalStars : b.totalExp - a.totalExp;
        const sortByLastUpdated = a.lastUpdated - b.lastUpdated;

        return sortByMode !== 0 ? sortByMode : sortByLastUpdated;
      })
      .map((user, idx) => ({ ...user, rank: idx + 1 }));

    setGlobals(sortedGlobals);
    setFriends(sortedFriends);
  };

  useEffect(() => {
    const getAllUsers = async () => {
      const snapshot = await getDocs(usersCollection);
      const data = snapshot.docs.map((doc) => ({ ...(doc.data() as IUser) }));

      const globalUsers = data
        .sort((a, b) => {
          const sortByTotalStars = b.progress.totalStars - a.progress.totalStars;
          const sortByLastUpdated = a.progress.lastUpdated - b.progress.lastUpdated;

          return sortByTotalStars !== 0 ? sortByTotalStars : sortByLastUpdated;
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
          totalExp: user.progress.totalExp,
          socials: user.profile.socials,
          lastUpdated: user.progress.lastUpdated,
        }));

      const friendUsers = data
        .sort((a, b) => {
          const sortByTotalStars = b.progress.totalStars - a.progress.totalStars;
          const sortByLastUpdated = a.progress.lastUpdated - b.progress.lastUpdated;

          return sortByTotalStars !== 0 ? sortByTotalStars : sortByLastUpdated;
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
          totalExp: user.progress.totalExp,
          socials: user.profile.socials,
          lastUpdated: user.progress.lastUpdated,
        }));

      setGlobals(globalUsers);
      setFriends(friendUsers);
    };

    getAllUsers();
  }, [userCtx.user, userCtx.user?.profile, userCtx.user?.progress]);

  return (
    <LeaderboardContext.Provider value={{ globals, friends, sortBy }}>
      {children}
    </LeaderboardContext.Provider>
  );
};
