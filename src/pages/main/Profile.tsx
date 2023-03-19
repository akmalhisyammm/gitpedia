import { IonIcon } from '@ionic/react';
import { logOutOutline } from 'ionicons/icons';

import { Layout } from 'components/layouts';
import { CustomButton } from 'components/atoms';
import { ProfileInfo, ProfileStats } from 'components/organisms';

const Profile = () => {
  return (
    <Layout title="Profil">
      <ProfileInfo />
      <ProfileStats />

      <CustomButton color="danger" style={{ margin: '8px 12px' }}>
        <IonIcon slot="start" icon={logOutOutline} />
        Keluar
      </CustomButton>
    </Layout>
  );
};

export default Profile;
