import { useParams } from 'react-router-dom';

import { Layout } from 'components/layouts';
import { QuizForm } from 'components/organisms';

type QuizParams = {
  chapterId: string;
  lessonId: string;
};

const Quiz = () => {
  const { chapterId, lessonId } = useParams<QuizParams>();

  return (
    <Layout title="Quiz">
      <QuizForm chapterId={Number(chapterId)} lessonId={Number(lessonId)} />
    </Layout>
  );
};

export default Quiz;
