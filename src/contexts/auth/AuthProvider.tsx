import { useEffect, useState } from 'react';
import { FirebaseError } from 'firebase/app';
import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signOut,
  type User,
} from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';

import { AuthContext } from './AuthContext';
import { LoadingScreen } from 'components/templates';
import { firebaseAuth, usersCollection } from 'lib/firebase';

import type { ILoginPayload, IRegisterPayload, IResetPasswordPayload } from 'types/auth';

type AuthProviderProps = {
  children: React.ReactNode;
};

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const register = async (payload: IRegisterPayload) => {
    try {
      const { user } = await createUserWithEmailAndPassword(
        firebaseAuth,
        payload.email,
        payload.password
      );
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password: _, ...rest } = payload;

      await setDoc(doc(usersCollection, user.uid), {
        ...rest,
        id: user.uid,
        avatar: '',
        frame: '',
        items: [],
        socials: [],
        activity: {
          following: [],
          followers: [],
        },
        progress: {
          totalCoins: 0,
          totalStars: 0,
          learns: [
            {
              chapterId: 1,
              lessonId: 1,
              stars: 0,
              isPassed: false,
            },
            {
              chapterId: 2,
              lessonId: 1,
              stars: 0,
              isPassed: false,
            },
            {
              chapterId: 2,
              lessonId: 2,
              stars: 0,
              isPassed: false,
            },
            {
              chapterId: 2,
              lessonId: 3,
              stars: 0,
              isPassed: false,
            },
            {
              chapterId: 2,
              lessonId: 4,
              stars: 0,
              isPassed: false,
            },
          ],
        },
      });
      await sendEmailVerification(user);
    } catch (error) {
      if (error instanceof FirebaseError) {
        switch (error.code) {
          case 'auth/invalid-email':
            throw new Error('Email tidak valid!');
          case 'auth/email-already-exists':
            throw new Error('Email sudah digunakan!');
          default:
            throw new Error('Terjadi kesalahan!');
        }
      }

      if (error instanceof Error) {
        throw new Error(error.message);
      }
    }
  };

  const login = async (payload: ILoginPayload) => {
    try {
      const { user } = await signInWithEmailAndPassword(
        firebaseAuth,
        payload.email,
        payload.password
      );

      if (!user.emailVerified) {
        throw new Error('Email kamu belum diverifikasi!');
      }
    } catch (error) {
      if (error instanceof FirebaseError) {
        switch (error.code) {
          case 'auth/invalid-email':
            throw new Error('Email tidak valid!');
          case 'auth/wrong-password':
            throw new Error('Email atau kata sandi salah!');
          case 'auth/user-not-found':
            throw new Error('Email belum terdaftar!');
          default:
            throw new Error('Terjadi kesalahan!');
        }
      }

      if (error instanceof Error) {
        throw new Error(error.message);
      }
    }
  };

  const logout = async () => {
    await signOut(firebaseAuth);
  };

  const resetPassword = async (payload: IResetPasswordPayload) => {
    try {
      if (!payload.email.trim().length) {
        throw new Error('Email harus diisi!');
      }

      await sendPasswordResetEmail(firebaseAuth, payload.email);
    } catch (error) {
      if (error instanceof FirebaseError) {
        switch (error.code) {
          case 'auth/invalid-email':
            throw new Error('Email tidak valid!');
          case 'auth/user-not-found':
            throw new Error('Email tidak ditemukan!');
          default:
            throw new Error('Terjadi kesalahan!');
        }
      }

      if (error instanceof Error) {
        throw new Error(error.message);
      }
    }
  };

  useEffect(() => {
    const unsubscribe = firebaseAuth.onIdTokenChanged((user: User | null) => {
      setUser(user?.emailVerified ? user : null);
      setIsLoading(false);
    });

    return unsubscribe;
  }, [user]);

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <AuthContext.Provider value={{ user, register, login, logout, resetPassword }}>
      {children}
    </AuthContext.Provider>
  );
};
