import { useContext } from 'react';
import { IonList, IonText } from '@ionic/react';

import { LeaderboardContext } from 'contexts/leaderboard';
import { CustomLink } from 'components/atoms';
import { LeaderboardItem } from 'components/molecules';

import styles from './LeaderboardList.module.scss';

type LeaderboardListProps = {
  mode: string;
};

const LeaderboardList = ({ mode }: LeaderboardListProps) => {
  const leaderboardCtx = useContext(LeaderboardContext);

  console.log(leaderboardCtx.globals);

  return (
    <IonList className={styles.list}>
      {mode === 'globals' ? (
        leaderboardCtx.globals.map((player) => (
          <CustomLink key={player.id} href={`/player/${player.id}`}>
            <LeaderboardItem {...player} />
          </CustomLink>
        ))
      ) : leaderboardCtx.friends.length ? (
        leaderboardCtx.friends.map((player) => (
          <CustomLink key={player.id} href={`/player/${player.id}`}>
            <LeaderboardItem {...player} />
          </CustomLink>
        ))
      ) : (
        <IonText className="ion-text-center">
          <p>Kamu belum memiliki teman</p>
        </IonText>
      )}
    </IonList>
  );
};

export default LeaderboardList;
