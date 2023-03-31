import { useContext } from 'react';
import { IonGrid, IonRow, IonCol } from '@ionic/react';

import { ChapterContext } from 'contexts/chapter';
import { UserContext } from 'contexts/user';
import { CustomLink } from 'components/atoms';
import { ChapterCard } from 'components/molecules';

const ChapterList = () => {
  const chapterCtx = useContext(ChapterContext);
  const userCtx = useContext(UserContext);

  return (
    <IonGrid>
      <IonRow>
        {chapterCtx.chapters.map((chapter) => {
          if (!userCtx.user) return null;

          // Get previous learn
          const currentLearnIdx = userCtx.user.progress.learns.findIndex(
            (learn) => learn.chapterId === chapter.id && learn.lessonId === 1
          );
          const prevLearn = userCtx.user.progress.learns[currentLearnIdx - 1];

          // Calculate chapter progress
          const chapterPercentage =
            userCtx.user.progress.learns.filter(
              (learn) => learn.chapterId === chapter.id && learn.isPassed
            ).length / chapter.lessons.length;

          return (
            <IonCol size="12" sizeSm="6" key={chapter.id}>
              {chapter.id === 1 || prevLearn.isPassed ? (
                <CustomLink href={`/learn/${chapter.id}`}>
                  <ChapterCard
                    title={chapter.title}
                    thumbnail={chapter.thumbnail}
                    percentage={chapterPercentage}
                  />
                </CustomLink>
              ) : (
                <ChapterCard title={chapter.title} thumbnail={chapter.thumbnail} isLocked />
              )}
            </IonCol>
          );
        })}
      </IonRow>
    </IonGrid>
  );
};

export default ChapterList;
