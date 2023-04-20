import { useContext, useState } from 'react';

import { UserContext } from 'contexts/user';
import { Layout } from 'components/layouts';
import { FriendListModal, ProfileInfo, ProfileStats } from 'components/organisms';

const Profile = () => {
  const [friendType, setFriendType] = useState<'following' | 'followers' | null>(null);

  const userCtx = useContext(UserContext);

  return (
    <Layout title="Profil" isMenuButton>
      <ProfileInfo type="self" userId={String(userCtx.user?.id)} />
      <ProfileStats userId={String(userCtx.user?.id)} onShowFriend={setFriendType} />
      <FriendListModal
        type={friendType}
        userId={String(userCtx.user?.id)}
        isOpen={!!friendType}
        onDismiss={() => setFriendType(null)}
      />
    </Layout>
  );
};

export default Profile;
