import ReactMarkdown from 'react-markdown';
import { IonCol, IonGrid, IonRow, IonText } from '@ionic/react';

import { CustomButton } from 'components/atoms';

import styles from './LessonContent.module.scss';

type LessonContentProps = {
  content: string;
  onStartQuiz: () => void;
};

const LessonContent = ({ content, onStartQuiz }: LessonContentProps) => {
  return (
    <IonGrid>
      <IonRow>
        <IonCol>
          <IonText className={styles.content}>
            <ReactMarkdown>{content.replaceAll('\\n', '\n')}</ReactMarkdown>
          </IonText>
        </IonCol>
      </IonRow>
      <IonRow className="ion-margin-vertical">
        <IonCol>
          <CustomButton color="primary" onClick={onStartQuiz}>
            Mulai Kuis
          </CustomButton>
        </IonCol>
      </IonRow>
    </IonGrid>
  );
};

export default LessonContent;
