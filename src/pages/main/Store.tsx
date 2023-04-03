import { Layout } from 'components/layouts';
import { StoreList } from 'components/organisms';

const Store = () => {
  return (
    <Layout title="Toko" isMenuButton>
      <StoreList />
    </Layout>
  );
};

export default Store;
