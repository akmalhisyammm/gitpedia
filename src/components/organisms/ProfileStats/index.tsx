import { useContext } from 'react';
import { IonGrid, IonRow, IonCol } from '@ionic/react';

import { UserContext } from 'contexts/user';
import { StatisticCard } from 'components/molecules';

const ProfileStats = () => {
  const userCtx = useContext(UserContext);

  if (!userCtx.user) return null;

  return (
    <IonGrid className="ion-text-center">
      <IonRow>
        <IonCol size="6">
          <StatisticCard title="Mengikuti" value={userCtx.user.activity.following.length} />
        </IonCol>
        <IonCol size="6">
          <StatisticCard title="Pengikut" value={userCtx.user.activity.followers.length} />
        </IonCol>
        <IonCol size="12">
          <StatisticCard title="Peringkat Dunia" value={2} />
        </IonCol>
        <IonCol size="12">
          <StatisticCard title="Total Bintang" value={userCtx.user.progress.totalStars} />
        </IonCol>
      </IonRow>
    </IonGrid>
  );
};

export default ProfileStats;
