import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent } from '@ionic/react';

const About = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>About</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <h1>About</h1>
      </IonContent>
    </IonPage>
  );
};

export default About;
