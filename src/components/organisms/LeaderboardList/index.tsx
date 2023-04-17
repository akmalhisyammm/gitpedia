import { useContext, useEffect, useState } from 'react';
import { IonIcon, IonItem, IonList, IonSelect, IonSelectOption, IonText } from '@ionic/react';
import { funnelOutline } from 'ionicons/icons';

import { LeaderboardContext } from 'contexts/leaderboard';
import { UserContext } from 'contexts/user';
import { CustomLink } from 'components/atoms';
import { LeaderboardItem } from 'components/molecules';

import styles from './LeaderboardList.module.scss';

type LeaderboardListProps = {
  mode: string;
};

const LeaderboardList = ({ mode }: LeaderboardListProps) => {
  const [selectedSort, setSelectedSort] = useState<'total_stars' | 'total_exp'>('total_stars');

  const leaderboardCtx = useContext(LeaderboardContext);
  const userCtx = useContext(UserContext);

  useEffect(() => {
    leaderboardCtx.sortBy(selectedSort);
  }, [selectedSort]);

  return (
    <IonList className={styles.list}>
      <IonItem className={styles.sort}>
        <IonIcon icon={funnelOutline} color="primary" slot="start" />
        <IonSelect
          value={selectedSort}
          interface="popover"
          slot="end"
          onIonChange={(e) => setSelectedSort(e.detail.value)}>
          <IonSelectOption value="total_stars">Total Bintang</IonSelectOption>
          <IonSelectOption value="total_exp">Total XP</IonSelectOption>
        </IonSelect>
      </IonItem>
      {mode === 'globals' ? (
        leaderboardCtx.globals.map((player) => (
          <CustomLink
            key={player.id}
            href={player.id === userCtx.user?.id ? '/main/profile' : `/user/${player.id}`}>
            <LeaderboardItem {...player} mode={selectedSort} />
          </CustomLink>
        ))
      ) : leaderboardCtx.friends.length ? (
        leaderboardCtx.friends.map((player) => (
          <CustomLink key={player.id} href={`/user/${player.id}`}>
            <LeaderboardItem {...player} mode={selectedSort} />
          </CustomLink>
        ))
      ) : (
        <IonText className="ion-text-center">
          <p>Kamu belum mengikuti teman</p>
        </IonText>
      )}
    </IonList>
  );
};

export default LeaderboardList;
