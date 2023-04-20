import { useContext, useEffect, useState, type Dispatch, type SetStateAction } from 'react';
import { IonGrid, IonRow, IonCol } from '@ionic/react';

import { LeaderboardContext } from 'contexts/leaderboard';
import { StatisticCard } from 'components/molecules';

import type { IUserLeaderboard } from 'types/leaderboard';

type ProfileStatsProps = {
  userId: string;
  onShowFriend: Dispatch<SetStateAction<'following' | 'followers' | null>>;
};

const ProfileStats = ({ userId, onShowFriend }: ProfileStatsProps) => {
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
          <StatisticCard
            title="Mengikuti"
            value={currentUser.friend.following.length}
            onShowModal={() => onShowFriend('following')}
          />
        </IonCol>
        <IonCol size="6">
          <StatisticCard
            title="Pengikut"
            value={currentUser.friend.followers.length}
            onShowModal={() => onShowFriend('followers')}
          />
        </IonCol>
        <IonCol size="6">
          <StatisticCard title="Total Bintang" value={currentUser.progress.totalStars} />
        </IonCol>
        <IonCol size="6">
          <StatisticCard title="Total XP" value={currentUser.progress.totalExp} />
        </IonCol>
        <IonCol size="12">
          <StatisticCard title="Peringkat Global" value={currentUser.rank} />
        </IonCol>
      </IonRow>
    </IonGrid>
  );
};

export default ProfileStats;
