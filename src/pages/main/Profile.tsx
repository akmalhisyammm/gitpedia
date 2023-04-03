import { useContext } from 'react';

import { UserContext } from 'contexts/user';
import { Layout } from 'components/layouts';
import { ProfileInfo, ProfileStats } from 'components/organisms';

const Profile = () => {
  const userCtx = useContext(UserContext);

  return (
    <Layout title="Profil" isMenuButton>
      <ProfileInfo type="self" userId={String(userCtx.user?.id)} />
      <ProfileStats userId={String(userCtx.user?.id)} />
    </Layout>
  );
};

export default Profile;
