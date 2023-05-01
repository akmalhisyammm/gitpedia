import { useEffect, useState } from 'react';
import { FirebaseError } from 'firebase/app';
import {
  applyActionCode,
  confirmPasswordReset,
  createUserWithEmailAndPassword,
  sendEmailVerification,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signOut,
  verifyPasswordResetCode,
  type User,
} from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';

import { AuthContext } from './AuthContext';
import { LoadingScreen } from 'components/templates';
import { firebaseAuth, usersCollection } from 'lib/firebase';

import type {
  IConfirmResetPasswordPayload,
  ILoginPayload,
  IRegisterPayload,
  IRequestResetPasswordPayload,
  IVerifyPayload,
} from 'types/auth';

type AuthProviderProps = {
  children: React.ReactNode;
};

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const register = async (payload: IRegisterPayload) => {
    try {
      const { email, password, ...profile } = payload;
      const { user } = await createUserWithEmailAndPassword(firebaseAuth, email, password);

      await setDoc(doc(usersCollection, user.uid), {
        id: user.uid,
        email,
        profile: {
          ...profile,
          avatar: '',
          frame: '',
          socials: [],
          isCompleted: false,
        },
        items: [],
        friend: {
          following: [],
          followers: [],
        },
        progress: {
          totalCoins: 0,
          totalStars: 0,
          totalExp: 0,
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
          lastUpdated: Date.now(),
          isEasterEggDone: false,
        },
      });
      await sendEmailVerification(user);
    } catch (error) {
      if (error instanceof FirebaseError) {
        switch (error.code) {
          case 'auth/invalid-email':
            throw new Error('Email tidak valid!');
          case 'auth/email-already-in-use':
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
            throw new Error('Akun belum terdaftar!');
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

  const verifyEmail = async (payload: IVerifyPayload) => {
    try {
      await applyActionCode(firebaseAuth, payload.oobCode);
    } catch (error) {
      if (error instanceof FirebaseError) {
        switch (error.code) {
          case 'auth/invalid-action-code':
            throw new Error('Kode verifikasi tidak valid atau sudah kedaluwarsa!');
          default:
            throw new Error('Terjadi kesalahan!');
        }
      }

      if (error instanceof Error) {
        throw new Error(error.message);
      }
    }
  };

  const verifyResetPassword = async (payload: IVerifyPayload) => {
    try {
      const email = await verifyPasswordResetCode(firebaseAuth, payload.oobCode);

      return email;
    } catch (error) {
      if (error instanceof FirebaseError) {
        switch (error.code) {
          case 'auth/invalid-action-code':
            throw new Error('Kode verifikasi tidak valid atau sudah kedaluwarsa!');
          default:
            throw new Error('Terjadi kesalahan!');
        }
      }

      if (error instanceof Error) {
        throw new Error(error.message);
      }
    }
  };

  const requestEmailVerification = async (payload: ILoginPayload) => {
    try {
      const { user } = await signInWithEmailAndPassword(
        firebaseAuth,
        payload.email,
        payload.password
      );

      if (user.emailVerified) {
        throw new Error('Email kamu sudah diverifikasi!');
      }

      await sendEmailVerification(user);
    } catch (error) {
      if (error instanceof FirebaseError) {
        switch (error.code) {
          case 'auth/invalid-email':
            throw new Error('Email tidak valid!');
          case 'auth/wrong-password':
            throw new Error('Email atau kata sandi salah!');
          case 'auth/user-not-found':
            throw new Error('Akun belum terdaftar!');
          default:
            throw new Error('Terjadi kesalahan!');
        }
      }

      if (error instanceof Error) {
        throw new Error(error.message);
      }
    }
  };

  const requestResetPassword = async (payload: IRequestResetPasswordPayload) => {
    try {
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

  const confirmResetPassword = async (payload: IConfirmResetPasswordPayload) => {
    try {
      await confirmPasswordReset(firebaseAuth, payload.oobCode, payload.newPassword);
    } catch (error) {
      if (error instanceof FirebaseError) {
        switch (error.code) {
          case 'auth/invalid-action-code':
            throw new Error('Kode verifikasi tidak valid atau sudah kedaluwarsa!');
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
    <AuthContext.Provider
      value={{
        user,
        register,
        login,
        logout,
        verifyEmail,
        verifyResetPassword,
        requestEmailVerification,
        requestResetPassword,
        confirmResetPassword,
      }}>
      {children}
    </AuthContext.Provider>
  );
};
