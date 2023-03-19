import { IonList } from '@ionic/react';

import { LeaderboardCard } from 'components/molecules';

type LeaderboardListProps = {
  mode: string;
};

const PLAYERS = [
  {
    id: 1,
    username: 'johnthor',
    name: 'John Thor',
    score: 50,
    avatar: '/assets/icon/avatars/tasmanian.png',
    frame: '/assets/icon/frames/rainbow.png',
  },
  {
    id: 2,
    username: 'johnsmith',
    name: 'John Smith',
    score: 40,
    avatar: '/assets/icon/avatars/rabbit.png',
    frame: '/assets/icon/frames/strip.png',
  },
  {
    id: 3,
    username: 'johndoe',
    name: 'John Doe',
    score: 60,
    avatar: '/assets/icon/avatars/lion.png',
    frame: '/assets/icon/frames/technology.png',
  },
  {
    id: 4,
    username: 'johnwick',
    name: 'John Wick',
    score: 30,
    avatar: '/assets/icon/avatars/bear.png',
    frame: '/assets/icon/frames/colorful.png',
  },
];

const FRIENDS = ['johnsmith', 'johndoe', 'johnwick'];

const LeaderboardList = ({ mode }: LeaderboardListProps) => {
  return (
    <IonList>
      {mode === 'friends'
        ? PLAYERS.filter((player) => FRIENDS.includes(player.username))
            .sort((a, b) => b.score - a.score)
            .map((player, idx) => <LeaderboardCard key={player.id} rank={idx + 1} {...player} />)
        : PLAYERS.sort((a, b) => b.score - a.score).map((player, idx) => (
            <LeaderboardCard key={player.id} rank={idx + 1} {...player} />
          ))}
    </IonList>
  );
};

export default LeaderboardList;
