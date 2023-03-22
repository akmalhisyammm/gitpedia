import { IonCard, IonCardContent, IonCol, IonGrid, IonRow, IonText } from '@ionic/react';
import { useRef } from 'react';

import { CustomButton } from 'components/atoms';
import { InputGroup } from 'components/molecules';

import styles from './QuizForm.module.scss';

const QuizForm = () => {
  const answerRef = useRef<HTMLIonInputElement>(null);

  return (
    <IonGrid className={styles.wrapper}>
      <IonRow>
        <IonCol className="ion-text-start">
          <IonText>1/3</IonText>
        </IonCol>
        <IonCol className="ion-text-end">
          <IonText>04:59</IonText>
        </IonCol>
      </IonRow>
      <IonRow>
        <IonCol>
          <IonCard color="tertiary" className={styles.card}>
            <IonCardContent>
              <IonText>
                <h2>
                  Lorem ipsum dolor sit, amet consectetur adipisicing elit. Consectetur repudiandae
                  tempora totam corporis distinctio porro, nihil quisquam in hic consequatur
                  doloremque a vero veritatis officiis esse iure similique. Laudantium, autem?
                </h2>
              </IonText>
            </IonCardContent>
          </IonCard>
        </IonCol>
      </IonRow>
      <IonRow>
        <IonCol>
          <InputGroup
            ref={answerRef}
            type="text"
            inputMode="text"
            placeholder="Ketik perintah di sini..."
            labelStart="$"
          />
        </IonCol>
      </IonRow>
      <IonRow>
        <IonCol>
          <CustomButton color="primary">Periksa</CustomButton>
        </IonCol>
      </IonRow>
    </IonGrid>
  );
};

export default QuizForm;
