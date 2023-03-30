import { IonApp, IonPage, IonContent, IonSpinner, IonText } from '@ionic/react';

import styles from './LoadingScreen.module.scss';

const LoadingScreen = () => {
  return (
    <IonApp>
      <IonPage>
        <IonContent color="tertiary">
          <div className={styles.wrapper}>
            <IonSpinner name="dots" className={styles.spinner} />
            <IonText>Mohon Tunggu</IonText>
          </div>
        </IonContent>
      </IonPage>
    </IonApp>
  );
};

export default LoadingScreen;
