import { useContext, useEffect, useState } from 'react';
import {
  IonCard,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonChip,
  IonIcon,
  IonLabel,
  IonText,
  useIonLoading,
  useIonToast,
} from '@ionic/react';
import {
  male,
  female,
  globeOutline,
  logoGithub,
  logoInstagram,
  logoLinkedin,
  logoTwitter,
  alertCircle,
} from 'ionicons/icons';

import { COIN_ICON_URL } from 'constants/images';
import { LeaderboardContext } from 'contexts/leaderboard';
import { UserContext } from 'contexts/user';
import { CustomButton, CustomLink, FramedAvatar } from 'components/atoms';

import type { IUserLeaderboard } from 'types/leaderboard';

import styles from './ProfileInfo.module.scss';

type ProfileInfoProps = {
  type: 'self' | 'others';
  userId: string;
};

const ProfileInfo = ({ type, userId }: ProfileInfoProps) => {
  const [currentUser, setCurrentUser] = useState<IUserLeaderboard | null>(null);

  const [presentToast] = useIonToast();
  const [presentLoading, dismissLoading] = useIonLoading();

  const leaderboardCtx = useContext(LeaderboardContext);
  const userCtx = useContext(UserContext);

  const getSocialIcon = (name: string) => {
    switch (name) {
      case 'Website':
        return globeOutline;
      case 'GitHub':
        return logoGithub;
      case 'LinkedIn':
        return logoLinkedin;
      case 'Instagram':
        return logoInstagram;
      case 'Twitter':
        return logoTwitter;
    }
  };

  const handleToggleActivity = async (mode: 'follow' | 'unfollow') => {
    if (!userCtx.user || !currentUser) return;

    try {
      presentLoading({ mode: 'ios', spinner: 'crescent' });

      await userCtx.updateActivity(
        {
          following:
            mode === 'follow'
              ? [...userCtx.user.activity.following, userId]
              : userCtx.user.activity.following.filter((id) => id !== userId),
          followers: userCtx.user.activity.followers,
        },
        {
          id: currentUser.id,
          following: currentUser.following,
          followers:
            mode === 'follow'
              ? [...currentUser.followers, userCtx.user.id]
              : currentUser.followers.filter((id) => id !== userCtx.user?.id),
        }
      );
    } catch (error) {
      if (error instanceof Error) {
        presentToast({
          mode: 'ios',
          message: error.message,
          duration: 2000,
          color: 'danger',
          icon: alertCircle,
        });
      }
    } finally {
      dismissLoading();
    }
  };

  useEffect(() => {
    const user = leaderboardCtx.globals.find((user) => user.id === userId);
    setCurrentUser(user || null);
  }, [leaderboardCtx.globals, userId]);

  if (!userCtx.user || !currentUser) return null;

  return (
    <>
      <IonCard color="tertiary" className={styles.card}>
        <div className={styles.profile}>
          <FramedAvatar avatar={currentUser.avatar} frame={currentUser.frame} width={80} />
          <IonCardHeader>
            <IonCardTitle>{currentUser.name}</IonCardTitle>
            <IonCardSubtitle className={styles.occupation}>
              {currentUser.occupation}
            </IonCardSubtitle>
            {currentUser.gender === 'male' ? (
              <IonCardSubtitle className={styles.gender}>
                <IonIcon icon={male} color="primary" />
                Laki-laki
              </IonCardSubtitle>
            ) : (
              <IonCardSubtitle className={styles.gender}>
                <IonIcon icon={female} color="primary" />
                Perempuan
              </IonCardSubtitle>
            )}
          </IonCardHeader>
        </div>

        <hr className={styles.divider} />

        {currentUser.socials.length ? (
          <div className={styles.socialWrapper}>
            {currentUser.socials.map((social) => (
              <CustomLink key={social.name} href={social.url} isExternal>
                <IonChip color="light" outline>
                  <IonIcon icon={getSocialIcon(social.name)} />
                  <IonLabel>{social.name}</IonLabel>
                </IonChip>
              </CustomLink>
            ))}
          </div>
        ) : (
          <IonText color="secondary" className="ion-text-center">
            <p>Tidak ada media sosial</p>
          </IonText>
        )}
      </IonCard>

      {type === 'self' ? (
        <>
          <CustomButton href="/user/edit" color="primary" className={styles.button}>
            Ubah Profil
          </CustomButton>
          {!userCtx.user.profile.isCompleted && (
            <div className={styles.info}>
              <IonText color="medium">
                <small>Lengkapi profil kamu untuk mendapatkan +250</small>
              </IonText>
              <img src={COIN_ICON_URL} alt="Coin" width={14} className={styles.icon} />
            </div>
          )}
        </>
      ) : !userCtx.user.activity.following.includes(userId) ? (
        <CustomButton
          color="primary"
          className={styles.button}
          onClick={() => handleToggleActivity('follow')}>
          Ikuti Sebagai Teman
        </CustomButton>
      ) : (
        <CustomButton
          color="secondary"
          className={styles.button}
          onClick={() => handleToggleActivity('unfollow')}>
          Berhenti Mengikuti
        </CustomButton>
      )}
    </>
  );
};

export default ProfileInfo;
