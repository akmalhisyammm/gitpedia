import { useContext } from 'react';
import {
  IonCard,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonChip,
  IonIcon,
  IonLabel,
  IonRouterLink,
  IonText,
} from '@ionic/react';
import {
  male,
  female,
  globeOutline,
  logoGithub,
  logoInstagram,
  logoLinkedin,
  logoTwitter,
  addOutline,
} from 'ionicons/icons';

import { UserContext } from 'contexts/user';
import { CustomButton, FramedAvatar } from 'components/atoms';

import styles from './ProfileInfo.module.scss';

type ProfileInfoProps = {
  type: 'self' | 'others';
};

const ProfileInfo = ({ type }: ProfileInfoProps) => {
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

  if (!userCtx.user) return null;

  return (
    <>
      <IonCard color="tertiary" className={styles.card}>
        <div className={styles.profile}>
          <FramedAvatar avatar={userCtx.user.avatar} frame={userCtx.user.frame} width={80} />
          <IonCardHeader>
            <IonCardTitle className={styles.name}>
              <IonIcon icon={userCtx.user.gender === 'male' ? male : female} color="primary" />{' '}
              {userCtx.user.name}
            </IonCardTitle>
            <IonCardSubtitle>{userCtx.user.occupation}</IonCardSubtitle>
          </IonCardHeader>
        </div>

        {!!userCtx.user.socials.length && (
          <>
            <hr className={styles.divider} />

            <div className={styles.socialWrapper}>
              {userCtx.user.socials.map((social) => (
                <IonRouterLink
                  key={social.name}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer">
                  <IonChip color="light" outline>
                    <IonIcon icon={getSocialIcon(social.name)} />
                    <IonLabel>{social.name}</IonLabel>
                  </IonChip>
                </IonRouterLink>
              ))}
            </div>
          </>
        )}
      </IonCard>

      {type === 'self' ? (
        <>
          <CustomButton href="/player/edit" color="primary" className={styles.editButton}>
            Ubah Profil
          </CustomButton>
          <div className={styles.editInfo}>
            <IonText color="medium">
              <small>Lengkapi profil kamu untuk mendapatkan +500</small>
            </IonText>
            <img src="/assets/icon/coin.png" alt="Koin" width={14} className={styles.icon} />
          </div>
        </>
      ) : (
        <CustomButton color="primary" className={styles.editButton}>
          <IonIcon slot="start" icon={addOutline} />
          Ikuti
        </CustomButton>
      )}
    </>
  );
};

export default ProfileInfo;
