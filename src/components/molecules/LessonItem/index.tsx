import { IonBadge, IonIcon, IonItem, IonText } from '@ionic/react';
import { star, lockClosed } from 'ionicons/icons';

import styles from './LessonItem.module.scss';

type LessonItemProps = {
  title: string;
  totalStars: number;
  isLocked?: boolean;
};

const LessonItem = ({ title, totalStars, isLocked }: LessonItemProps) => {
  return (
    <IonItem
      color="tertiary"
      button={!isLocked}
      detail={!isLocked}
      className={styles.item}
      style={{ opacity: isLocked ? 0.5 : 1 }}>
      <div className={styles.leftContent}>
        {totalStars > 0 && (
          <IonBadge color="success" className={styles.badge}>
            Lulus
          </IonBadge>
        )}
        {!isLocked && totalStars === 0 && (
          <IonBadge color="secondary" className={styles.badge}>
            Sedang Belajar
          </IonBadge>
        )}
        <IonText>{title}</IonText>
      </div>

      {isLocked ? (
        <IonIcon icon={lockClosed} color="secondary" slot="end" className={styles.lockIcon} />
      ) : (
        <div slot="end" className={styles.starsWrapper}>
          <IonIcon icon={star} color={totalStars > 0 ? 'warning' : 'secondary'} />
          <IonIcon icon={star} color={totalStars > 1 ? 'warning' : 'secondary'} />
          <IonIcon icon={star} color={totalStars > 2 ? 'warning' : 'secondary'} />
        </div>
      )}
    </IonItem>
  );
};

export default LessonItem;
