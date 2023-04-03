import { useContext, useEffect, useState } from 'react';
import { IonGrid, IonRow, IonCol } from '@ionic/react';

import { LeaderboardContext } from 'contexts/leaderboard';
import { StatisticCard } from 'components/molecules';

import type { IUserLeaderboard } from 'types/leaderboard';

type ProfileStatsProps = {
  userId: string;
};

const ProfileStats = ({ userId }: ProfileStatsProps) => {
  const [currentUser, setCurrentUser] = useState<IUserLeaderboard | null>(null);

  const leaderboardCtx = useContext(LeaderboardContext);

  useEffect(() => {
    const user = leaderboardCtx.globals.find((user) => user.id === userId);
    setCurrentUser(user || null);
  }, [leaderboardCtx.globals, userId]);

  if (!currentUser) return null;

  return (
    <IonGrid className="ion-text-center">
      <IonRow>
        <IonCol size="6">
          <StatisticCard title="Mengikuti" value={currentUser.following.length} />
        </IonCol>
        <IonCol size="6">
          <StatisticCard title="Pengikut" value={currentUser.followers.length} />
        </IonCol>
        <IonCol size="12">
          <StatisticCard title="Peringkat Dunia" value={currentUser.rank} />
        </IonCol>
        <IonCol size="12">
          <StatisticCard title="Total Bintang" value={currentUser.totalStars} />
        </IonCol>
      </IonRow>
    </IonGrid>
  );
};

export default ProfileStats;
