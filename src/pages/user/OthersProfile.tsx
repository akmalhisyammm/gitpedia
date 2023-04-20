import { useState } from 'react';
import { useParams } from 'react-router-dom';

import { Layout } from 'components/layouts';
import { FriendListModal, ProfileInfo, ProfileStats } from 'components/organisms';

type OthersProfileParams = {
  userId: string;
};

const OthersProfile = () => {
  const [friendType, setFriendType] = useState<'following' | 'followers' | null>(null);

  const { userId } = useParams<OthersProfileParams>();

  return (
    <Layout title="Profil">
      <ProfileInfo type="others" userId={userId} />
      <ProfileStats userId={userId} onShowFriend={setFriendType} />
      <FriendListModal
        type={friendType}
        userId={userId}
        isOpen={!!friendType}
        onDismiss={() => setFriendType(null)}
      />
    </Layout>
  );
};

export default OthersProfile;
