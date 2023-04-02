import { useContext } from 'react';
import { useLocation } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import { IonCol, IonGrid, IonRow, IonText } from '@ionic/react';

import { ChapterContext } from 'contexts/chapter';
import { CustomButton } from 'components/atoms';

import styles from './LessonContent.module.scss';

type LessonContentProps = {
  chapterId: number;
  lessonId: number;
};

const LessonContent = ({ chapterId, lessonId }: LessonContentProps) => {
  const location = useLocation();

  const chapterCtx = useContext(ChapterContext);

  return (
    <IonGrid>
      <IonRow>
        <IonCol>
          <IonText className={styles.content}>
            <ReactMarkdown>
              {chapterCtx.chapters[Number(chapterId) - 1].lessons[
                Number(lessonId) - 1
              ].content.replaceAll('\\n', '\n')}
            </ReactMarkdown>
          </IonText>
        </IonCol>
      </IonRow>
      <IonRow className="ion-margin-vertical">
        <IonCol>
          <CustomButton color="primary" href={`${location.pathname}/quiz`}>
            Mulai Kuis
          </CustomButton>
        </IonCol>
      </IonRow>
    </IonGrid>
  );
};

export default LessonContent;
