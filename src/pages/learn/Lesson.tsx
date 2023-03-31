import { useContext, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';

import { ChapterContext } from 'contexts/chapter';
import { Layout } from 'components/layouts';
import { LessonContent, QuizModal } from 'components/organisms';
import { fyShuffle } from 'utils/fyShuffle';

import type { IQuiz } from 'types/chapter';

type LessonParams = {
  chapterId: string;
  lessonId: string;
};

const Lesson = () => {
  const { chapterId, lessonId } = useParams<LessonParams>();

  const [isQuizStarted, setIsQuizStarted] = useState<boolean>(false);
  const [shuffledQuiz, setShuffledQuiz] = useState<IQuiz[]>([]);

  const history = useHistory();
  const chapterCtx = useContext(ChapterContext);

  const handleStartQuiz = () => {
    const shuffleQuiz = fyShuffle(
      chapterCtx.chapters[Number(chapterId) - 1].lessons[Number(lessonId) - 1].quiz
    );

    setShuffledQuiz(shuffleQuiz);
    setIsQuizStarted(true);
  };

  const handleFinishQuiz = () => {
    setIsQuizStarted(false);
    history.replace(`/learn/${chapterId}`);
  };

  return (
    <Layout title={chapterCtx.chapters[Number(chapterId) - 1]?.lessons[Number(lessonId) - 1].title}>
      {!!chapterCtx.chapters.length && (
        <LessonContent
          content={chapterCtx.chapters[Number(chapterId) - 1].lessons[Number(lessonId) - 1].content}
          onStartQuiz={handleStartQuiz}
        />
      )}
      {!!shuffledQuiz.length && (
        <QuizModal
          data={shuffledQuiz.slice(0, 3)}
          chapterId={Number(chapterId)}
          lessonId={Number(lessonId)}
          isOpen={isQuizStarted}
          onFinish={handleFinishQuiz}
        />
      )}
    </Layout>
  );
};

export default Lesson;
