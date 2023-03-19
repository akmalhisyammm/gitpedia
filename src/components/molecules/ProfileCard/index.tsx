import {
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonIcon,
  IonCardSubtitle,
  IonChip,
  IonLabel,
  IonRouterLink,
} from '@ionic/react';
import {
  male,
  globeOutline,
  logoGithub,
  logoLinkedin,
  logoInstagram,
  logoTwitter,
  female,
} from 'ionicons/icons';

import { CustomImage } from 'components/atoms';

import styles from './ProfileCard.module.scss';

type ProfileCardProps = {
  name: string;
  avatar: string;
  frame: string;
  gender: 'male' | 'female';
  occupation: string;
  socialMedia: {
    name: 'Website' | 'GitHub' | 'LinkedIn' | 'Instagram' | 'Twitter';
    url: string;
  }[];
};

const ProfileCard = ({
  name,
  avatar,
  frame,
  gender,
  occupation,
  socialMedia,
}: ProfileCardProps) => {
  const getSocialMediaIcon = (name: string) => {
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

  return (
    <IonCard color="tertiary" className={styles.card}>
      <div className={styles.profile}>
        <div className={styles.imageWrapper}>
          <CustomImage src={avatar} alt="Avatar" className={styles.avatar} />
          <CustomImage src={frame} alt="Frame" className={styles.frame} />
        </div>
        <IonCardHeader>
          <IonCardTitle className={styles.name}>
            <IonIcon icon={gender === 'male' ? male : female} color="primary" /> {name}
          </IonCardTitle>
          <IonCardSubtitle>{occupation}</IonCardSubtitle>
        </IonCardHeader>
      </div>

      <hr className={styles.divider} />

      <div className={styles.socialMedia}>
        {socialMedia.map((media) => (
          <IonRouterLink
            key={media.name}
            href={media.url}
            target="_blank"
            rel="noopener noreferrer">
            <IonChip color="light" outline>
              <IonIcon icon={getSocialMediaIcon(media.name)} />
              <IonLabel>{media.name}</IonLabel>
            </IonChip>
          </IonRouterLink>
        ))}
      </div>
    </IonCard>
  );
};

export default ProfileCard;
