import { useState } from 'react';

import { Layout } from 'components/layouts';
import { LeaderboardList, LeaderboardSegment } from 'components/organisms';

const Leaderboard = () => {
  const [segment, setSegment] = useState('all');

  return (
    <Layout title="Peringkat">
      <LeaderboardSegment selectedValue={segment} onSelect={(value) => setSegment(value)} />
      <LeaderboardList mode={segment} />
    </Layout>
  );
};

export default Leaderboard;
