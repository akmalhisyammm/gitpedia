import { IonGrid, IonRow, IonCol } from '@ionic/react';

import { StatisticCard } from 'components/molecules';

const STATISTIC = {
  worldRank: 1,
  totalStars: 60,
  totalFriends: 6,
};

const ProfileStats = () => {
  return (
    <IonGrid className="ion-text-center">
      <IonRow>
        <IonCol size="6">
          <StatisticCard title="Peringkat Dunia" value={STATISTIC.worldRank} />
        </IonCol>
        <IonCol size="6">
          <StatisticCard title="Total Bintang" value={STATISTIC.totalStars} />
        </IonCol>
        <IonCol size="12">
          <StatisticCard title="Teman yang Dimiliki" value={STATISTIC.totalFriends} />
        </IonCol>
      </IonRow>
    </IonGrid>
  );
};

export default ProfileStats;
