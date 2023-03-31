import { useContext } from 'react';
import { useLocation } from 'react-router-dom';
import { IonList } from '@ionic/react';

import { UserContext } from 'contexts/user';
import { ChapterContext } from 'contexts/chapter';
import { CustomLink } from 'components/atoms';
import { LessonItem } from 'components/molecules';

import styles from './LessonList.module.scss';

type LessonListProps = {
  chapterId: number;
};

const LessonList = ({ chapterId }: LessonListProps) => {
  const location = useLocation();

  const chapterCtx = useContext(ChapterContext);
  const userCtx = useContext(UserContext);

  return (
    <IonList className={styles.list}>
      {chapterCtx.chapters[chapterId - 1].lessons.map((lesson) => {
        if (!userCtx.user) return null;

        // Get previous learn
        const currentLearnIdx = userCtx.user.progress.learns.findIndex(
          (learn) => learn.chapterId === chapterId && learn.lessonId === lesson.id
        );
        const prevLearn = userCtx.user.progress.learns[currentLearnIdx - 1];

        // Get current learn
        const currentLearn = userCtx.user.progress.learns[currentLearnIdx];

        return lesson.id === 1 || prevLearn.isPassed ? (
          <CustomLink key={lesson.id} href={`${location.pathname}/${lesson.id}`}>
            <LessonItem key={lesson.id} title={lesson.title} totalStars={currentLearn.stars} />
          </CustomLink>
        ) : (
          <LessonItem key={lesson.id} title={lesson.title} totalStars={0} isLocked />
        );
      })}
    </IonList>
  );
};

export default LessonList;
