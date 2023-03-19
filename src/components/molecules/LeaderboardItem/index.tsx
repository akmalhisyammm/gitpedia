import { IonItem, IonText, IonIcon } from '@ionic/react';
import { star } from 'ionicons/icons';

import { CustomImage } from 'components/atoms';

import styles from './LeaderboardItem.module.scss';

type LeaderboardItemProps = {
  rank: number;
  name: string;
  score: number;
  avatar: string;
  frame: string;
};

const LeaderboardItem = ({ rank, name, score, avatar, frame }: LeaderboardItemProps) => {
  return (
    <IonItem button detail>
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

export default LeaderboardItem;
