import {
  IonCard,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonRippleEffect,
} from '@ionic/react';

import styles from './StatisticCard.module.scss';

type StatisticCardProps = {
  title: string;
  value: number;
  onShowModal?: () => void;
};

const StatisticCard = ({ title, value, onShowModal }: StatisticCardProps) => {
  return (
    <IonCard
      color={onShowModal ? 'secondary' : 'medium'}
      className={styles.card}
      style={{ cursor: onShowModal ? 'pointer' : '' }}
      onClick={onShowModal}>
      <IonCardHeader>
        <IonCardSubtitle>{title}</IonCardSubtitle>
        <IonCardTitle>{value}</IonCardTitle>
      </IonCardHeader>
      {!!onShowModal && <IonRippleEffect />}
    </IonCard>
  );
};

export default StatisticCard;
