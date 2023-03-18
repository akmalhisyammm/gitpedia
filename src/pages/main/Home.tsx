import { Layout } from 'components/layouts';
import { ChapterList, Hero } from 'components/organisms';

const Home = () => {
  return (
    <Layout title="Beranda">
      <Hero />
      <ChapterList />
    </Layout>
  );
};

export default Home;
