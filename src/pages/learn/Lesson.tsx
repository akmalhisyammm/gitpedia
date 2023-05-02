import { useContext } from 'react';
import { useParams } from 'react-router-dom';

import { ChapterContext } from 'contexts/chapter';
import { Layout } from 'components/layouts';
import { LessonContent } from 'components/organisms';

type LessonParams = {
  chapterId: string;
  lessonId: string;
};

const Lesson = () => {
  const { chapterId, lessonId } = useParams<LessonParams>();

  const chapterCtx = useContext(ChapterContext);

  return (
    <Layout title={chapterCtx.chapters[Number(chapterId) - 1]?.lessons[Number(lessonId) - 1].title}>
      {!!chapterCtx.chapters.length && (
        <LessonContent chapterId={Number(chapterId)} lessonId={Number(lessonId)} />
      )}
    </Layout>
  );
};

export default Lesson;
