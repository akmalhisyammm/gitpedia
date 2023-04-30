import { useContext, useEffect, useState } from 'react';
import { doc, getDoc, getDocs, updateDoc } from 'firebase/firestore';

import { UserContext } from './UserContext';
import { AuthContext } from 'contexts/auth';
import { usersCollection } from 'lib/firebase';

import type {
  IOtherUserFriend,
  IUser,
  IUserFriend,
  IUserItem,
  IUserProfile,
  IUserProgress,
} from 'types/user';

type UserProviderProps = {
  children: React.ReactNode;
};

export const UserProvider = ({ children }: UserProviderProps) => {
  const [user, setUser] = useState<IUser | null>(null);
  const [users, setUsers] = useState<IUser[]>([]);

  const authCtx = useContext(AuthContext);

  const getAllUsers = async () => {
    const snapshot = await getDocs(usersCollection);
    const data = snapshot.docs.map((doc) => ({ ...(doc.data() as IUser) }));

    setUsers(data);
  };

  const getAuthUser = async () => {
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
  };

  const addItem = async (payload: IUserItem) => {
    if (!authCtx.user || !user) return;

    try {
      await updateDoc(doc(usersCollection, authCtx.user.uid), {
        items: [...user.items, payload],
      });

      if (user) {
        // Bug: This will not update the user state properly because the state is updated asynchronously
        // const updatedUser = { ...user, items: [...user.items, payload] };
        // setUser(updatedUser);

        // Workaround: This will update the user state properly because the state is updated synchronously
        const updatedUser = { ...user };
        updatedUser.items.push(payload);

        setUser(updatedUser);
      }

      const updatedUsers = users.map((user) => {
        if (user.id === authCtx.user?.uid) {
          const updatedUser = { ...user };
          updatedUser.items.push(payload);

          return updatedUser;
        }

        return user;
      });

      setUsers(updatedUsers);
    } catch (error) {
      throw new Error('Terjadi kesalahan!');
    }
  };

  const updateFriend = async (selfPayload: IUserFriend, othersPayload: IOtherUserFriend) => {
    if (!authCtx.user) return;

    try {
      await updateDoc(doc(usersCollection, authCtx.user.uid), { friend: selfPayload });
      await updateDoc(doc(usersCollection, othersPayload.id), {
        friend: {
          following: othersPayload.following,
          followers: othersPayload.followers,
        },
      });

      if (user) {
        const updatedUser = { ...user, friend: selfPayload };
        setUser(updatedUser);
      }

      const updatedUsers = users.map((user) => {
        if (user.id === authCtx.user?.uid) {
          return { ...user, friend: selfPayload };
        }

        if (user.id === othersPayload.id) {
          return { ...user, friend: othersPayload };
        }

        return user;
      });

      setUsers(updatedUsers);
    } catch (error) {
      throw new Error('Terjadi kesalahan!');
    }
  };

  const updateProgress = async (payload: IUserProgress) => {
    if (!authCtx.user) return;

    const sortedPayload = {
      ...payload,
      learns: payload.learns.sort((a, b) => {
        if (a.chapterId === b.chapterId) {
          return a.lessonId - b.lessonId;
        }

        return a.chapterId - b.chapterId;
      }),
    };

    try {
      await updateDoc(doc(usersCollection, authCtx.user.uid), { progress: sortedPayload });

      if (user) {
        const updatedUser = { ...user, progress: sortedPayload };
        setUser(updatedUser);
      }

      const updatedUsers = users.map((user) => {
        if (user.id === authCtx.user?.uid) {
          return { ...user, progress: sortedPayload };
        }

        return user;
      });

      setUsers(updatedUsers);
    } catch (error) {
      throw new Error('Terjadi kesalahan!');
    }
  };

  const updateProfile = async (payload: IUserProfile) => {
    if (!authCtx.user) return;

    try {
      await updateDoc(doc(usersCollection, authCtx.user.uid), { profile: payload });

      if (user) {
        const updatedUser = { ...user, profile: payload };
        setUser(updatedUser);
      }

      const updatedUsers = users.map((user) => {
        if (user.id === authCtx.user?.uid) {
          return { ...user, profile: payload };
        }

        return user;
      });

      setUsers(updatedUsers);
    } catch (error) {
      throw new Error('Terjadi kesalahan!');
    }
  };

  useEffect(() => {
    getAllUsers();
    getAuthUser();
  }, [authCtx.user]);

  return (
    <UserContext.Provider
      value={{
        user,
        users,
        getAllUsers,
        getAuthUser,
        addItem,
        updateFriend,
        updateProgress,
        updateProfile,
      }}>
      {children}
    </UserContext.Provider>
  );
};
