import { IonText } from '@ionic/react';

import { CustomButton } from 'components/atoms';
import { ProfileCard } from 'components/molecules';

import styles from './ProfileInfo.module.scss';

type ProfileType = {
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

const PROFILE: ProfileType = {
  name: 'John Doe',
  avatar: '/assets/icon/avatars/rabbit.png',
  frame: '/assets/icon/frames/colorful.png',
  gender: 'male',
  occupation: 'Software Engineer',
  socialMedia: [
    {
      name: 'Website',
      url: 'https://google.com',
    },
    {
      name: 'GitHub',
      url: 'https://github.com',
    },
    {
      name: 'LinkedIn',
      url: 'https://linkedin.com',
    },
    {
      name: 'Instagram',
      url: 'https://instagram.com',
    },
    {
      name: 'Twitter',
      url: 'https://twitter.com',
    },
  ],
};

const ProfileInfo = () => {
  return (
    <div>
      <ProfileCard {...PROFILE} />

      <CustomButton color="primary" className={styles.editButton}>
        Ubah Profil
      </CustomButton>

      <div className={styles.editInfo}>
        <IonText color="medium">
          <small>Lengkapi profil kamu untuk mendapatkan +500</small>
        </IonText>
        <img src="/assets/icon/coin.png" alt="Koin" width={14} className={styles.icon} />
      </div>
    </div>
  );
};

export default ProfileInfo;
