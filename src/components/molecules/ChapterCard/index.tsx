import {
  IonText,
  IonProgressBar,
  IonIcon,
  IonCard,
  IonCardContent,
  IonRippleEffect,
} from '@ionic/react';
import { lockClosed } from 'ionicons/icons';

import { CustomImage } from 'components/atoms';

import styles from './ChapterCard.module.scss';

type ChapterCardProps = {
  title: string;
  thumbnail: string;
  percentage?: number;
  isLocked?: boolean;
};

const ChapterCard = ({ title, thumbnail, percentage, isLocked }: ChapterCardProps) => {
  return (
    <IonCard
      className={`${styles.wrapper} ion-activatable ripple-parent rounded-rectangle`}
      style={{ cursor: isLocked ? '' : 'pointer' }}>
      <CustomImage
        src={thumbnail}
        alt={title}
        className={styles.background}
        style={{ opacity: isLocked ? 0.5 : 1 }}
      />
      {isLocked ? (
        <div className={styles.overlay}>
          <div className={styles.icon}>
            <IonIcon icon={lockClosed} color="secondary" />
          </div>
        </div>
      ) : (
        <IonRippleEffect />
      )}
      <IonCardContent
        className={styles.content}
        style={{
          background:
            !isLocked &&
            'linear-gradient(0deg, rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0))',
        }}>
        <IonText>
          <h2>{title}</h2>
        </IonText>
        {!isLocked && percentage !== undefined && (
          <IonProgressBar value={percentage} className={styles.progressBar} />
        )}
      </IonCardContent>
    </IonCard>
  );
};

export default ChapterCard;
