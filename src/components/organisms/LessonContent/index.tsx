import { IonCol, IonGrid, IonRow, IonText } from '@ionic/react';

import { CustomButton } from 'components/atoms';

const LessonContent = () => {
  return (
    <IonGrid>
      <IonRow className="ion-text-justify">
        <IonCol>
          <IonText>
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Debitis atque beatae alias
            porro fugit voluptates. Dolor voluptatibus maxime dolorem? Nisi eveniet vitae blanditiis
            voluptatum soluta sequi adipisci rerum ut impedit.
          </IonText>
        </IonCol>
      </IonRow>
      <IonRow className="ion-margin-vertical">
        <IonCol>
          <CustomButton color="primary">Mulai Kuis</CustomButton>
        </IonCol>
      </IonRow>
    </IonGrid>
  );
};

export default LessonContent;