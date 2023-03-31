import { useContext } from 'react';
import { useParams } from 'react-router-dom';

import { ChapterContext } from 'contexts/chapter';
import { Layout } from 'components/layouts';
import { LessonList } from 'components/organisms';

type ChapterParams = {
  chapterId: string;
};

const Chapter = () => {
  const { chapterId } = useParams<ChapterParams>();

  const chapterCtx = useContext(ChapterContext);

  return (
    <Layout title={chapterCtx.chapters[Number(chapterId) - 1]?.title}>
      {!!chapterCtx.chapters.length && <LessonList chapterId={Number(chapterId)} />}
    </Layout>
  );
};

export default Chapter;
