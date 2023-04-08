import { useContext, useEffect, useState } from 'react';
import { doc, getDoc, updateDoc } from 'firebase/firestore';

import { UserContext } from './UserContext';
import { AuthContext } from 'contexts/auth';
import { usersCollection } from 'lib/firebase';

import type {
  IOtherUserActivity,
  IUser,
  IUserActivity,
  IUserItem,
  IUserProfile,
  IUserProgress,
} from 'types/user';

type UserProviderProps = {
  children: React.ReactNode;
};

export const UserProvider = ({ children }: UserProviderProps) => {
  const [user, setUser] = useState<IUser | null>(null);
  const [isFetching, setIsFetching] = useState<boolean>(true);

  const authCtx = useContext(AuthContext);

  const addItem = async (payload: IUserItem) => {
    setIsFetching(true);

    if (!authCtx.user || !user) return;

    try {
      await updateDoc(doc(usersCollection, authCtx.user.uid), {
        items: [...user.items, payload],
      });
    } catch (error) {
      throw new Error('Terjadi kesalahan!');
    }
  };

  const updateActivity = async (selfPayload: IUserActivity, othersPayload: IOtherUserActivity) => {
    setIsFetching(true);

    if (!authCtx.user) return;

    try {
      await updateDoc(doc(usersCollection, authCtx.user.uid), { activity: selfPayload });
      await updateDoc(doc(usersCollection, othersPayload.id), {
        activity: {
          following: othersPayload.following,
          followers: othersPayload.followers,
        },
      });
    } catch (error) {
      throw new Error('Terjadi kesalahan!');
    }
  };

  const updateProgress = async (payload: IUserProgress) => {
    setIsFetching(true);

    if (!authCtx.user) return;

    try {
      await updateDoc(doc(usersCollection, authCtx.user.uid), { progress: payload });
    } catch (error) {
      throw new Error('Terjadi kesalahan!');
    }
  };

  const updateProfile = async (payload: IUserProfile) => {
    setIsFetching(true);

    if (!authCtx.user) return;

    try {
      await updateDoc(doc(usersCollection, authCtx.user.uid), { profile: payload });
    } catch (error) {
      throw new Error('Terjadi kesalahan!');
    }
  };

  useEffect(() => {
    const getUser = async () => {
      if (!authCtx.user) return;

      const snapshot = await getDoc(doc(usersCollection, authCtx.user.uid));
      const data = snapshot.exists() ? (snapshot.data() as IUser) : null;

      if (!data) return;

      const newData = {
        ...data,
        progress: {
          ...data.progress,
          learns: data.progress.learns.sort((a, b) => {
            if (a.chapterId === b.chapterId) {
              return a.lessonId - b.lessonId;
            }

            return a.chapterId - b.chapterId;
          }),
        },
      };

      setUser(newData);
      setIsFetching(false);
    };

    getUser();
  }, [authCtx.user, isFetching]);

  return (
    <UserContext.Provider value={{ user, addItem, updateActivity, updateProgress, updateProfile }}>
      {children}
    </UserContext.Provider>
  );
};
