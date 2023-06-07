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
  totalExp: number;
  mode: 'total_stars' | 'total_exp';
  isSelf?: boolean;
};

const LeaderboardItem = ({
  rank,
  name,
  avatar,
  frame,
  totalStars,
  totalExp,
  mode,
  isSelf,
}: LeaderboardItemProps) => {
  return (
    <IonItem color={isSelf ? 'secondary' : ''} button detail>
      <IonText>{rank}</IonText>
      <div className={styles.profile}>
        <FramedAvatar avatar={avatar} frame={frame} width={60} />
        <IonText>{name}</IonText>
      </div>
      {mode === 'total_stars' ? (
        <div slot="end" className={styles.points}>
          <IonText>{totalStars}</IonText>
          <IonIcon icon={star} color="warning" />
        </div>
      ) : (
        <div slot="end" className={styles.points}>
          <IonText>{totalExp} XP</IonText>
        </div>
      )}
    </IonItem>
  );
};

export default LeaderboardItem;
