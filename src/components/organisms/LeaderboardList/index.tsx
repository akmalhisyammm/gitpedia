import { IonList } from '@ionic/react';
import { CustomLink } from 'components/atoms';

import { LeaderboardItem } from 'components/molecules';

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
      {PLAYERS.filter((player) => (mode === 'friends' ? FRIENDS.includes(player.username) : true))
        .sort((a, b) => b.score - a.score)
        .map((player, idx) => (
          <CustomLink key={player.id} href={`/player/${player.username}`}>
            <LeaderboardItem rank={idx + 1} {...player} />
          </CustomLink>
        ))}
    </IonList>
  );
};

export default LeaderboardList;
