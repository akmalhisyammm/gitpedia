import { IonItem, IonText, IonIcon } from '@ionic/react';
import { star } from 'ionicons/icons';

import { CustomImage } from 'components/atoms';

import styles from './LeaderboardCard.module.scss';

type LeaderboardCardProps = {
  rank: number;
  username: string;
  name: string;
  score: number;
  avatar: string;
  frame: string;
};

const LeaderboardCard = ({ rank, username, name, score, avatar, frame }: LeaderboardCardProps) => {
  return (
    <IonItem routerLink={`/player/${username}`} button detail>
      <IonText>{rank}</IonText>
      <div className={styles.profile}>
        <div className={styles.imageWrapper}>
          <CustomImage src={avatar} alt="Avatar" className={styles.avatar} />
          <CustomImage src={frame} alt="Frame" className={styles.frame} />
        </div>
        <IonText>{name}</IonText>
      </div>
      <div slot="end" className={styles.score}>
        <IonText>{score}</IonText>
        <IonIcon icon={star} color="warning" />
      </div>
    </IonItem>
  );
};

export default LeaderboardCard;
