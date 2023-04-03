import { useParams } from 'react-router-dom';

import { Layout } from 'components/layouts';
import { ProfileInfo, ProfileStats } from 'components/organisms';

type OthersProfileParams = {
  userId: string;
};

const OthersProfile = () => {
  const { userId } = useParams<OthersProfileParams>();

  return (
    <Layout title="Profil">
      <ProfileInfo type="others" userId={userId} />
      <ProfileStats userId={userId} />
    </Layout>
  );
};

export default OthersProfile;
