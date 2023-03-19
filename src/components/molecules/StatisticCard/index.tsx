import { IonCard, IonCardHeader, IonCardSubtitle, IonCardTitle } from '@ionic/react';

import styles from './StatisticCard.module.scss';

type StatisticCardProps = {
  title: string;
  value: number;
};

const StatisticCard = ({ title, value }: StatisticCardProps) => {
  return (
    <IonCard color="secondary" className={styles.card}>
      <IonCardHeader>
        <IonCardSubtitle>{title}</IonCardSubtitle>
        <IonCardTitle>{value}</IonCardTitle>
      </IonCardHeader>
    </IonCard>
  );
};

export default StatisticCard;
