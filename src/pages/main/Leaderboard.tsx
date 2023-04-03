import { useState } from 'react';

import { Layout } from 'components/layouts';
import { LeaderboardList, LeaderboardSegment } from 'components/organisms';

const Leaderboard = () => {
  const [segment, setSegment] = useState('globals');

  console.log(Date.now());

  return (
    <Layout title="Peringkat" isMenuButton>
      <LeaderboardSegment selectedValue={segment} onSelect={(value) => setSegment(value)} />
      <LeaderboardList mode={segment} />
    </Layout>
  );
};

export default Leaderboard;
