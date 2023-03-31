import { IonItem, IonText, IonIcon } from '@ionic/react';
import { star } from 'ionicons/icons';

import { FramedAvatar } from 'components/atoms';

import styles from './LeaderboardItem.module.scss';

type LeaderboardItemProps = {
  rank: number;
  name: string;
  avatar: string;
  frame: string;
  totalStars: number;
};

const LeaderboardItem = ({ rank, name, avatar, frame, totalStars }: LeaderboardItemProps) => {
  return (
    <IonItem button detail>
      <IonText>{rank}</IonText>
      <div className={styles.profile}>
        <FramedAvatar avatar={avatar} frame={frame} width={60} />
        <IonText>{name}</IonText>
      </div>
      <div slot="end" className={styles.stars}>
        <IonText>{totalStars}</IonText>
        <IonIcon icon={star} color="warning" />
      </div>
    </IonItem>
  );
};

export default LeaderboardItem;
