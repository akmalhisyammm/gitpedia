import { IonGrid, IonRow, IonCol, IonText, IonButton, IonRouterLink, IonIcon } from '@ionic/react';
import { openOutline } from 'ionicons/icons';

import styles from './Greeting.module.scss';

const Greeting = () => {
  return (
    <IonGrid className={styles.wrapper}>
      <IonRow>
        <IonCol>
          <h1 className={styles.title}>
            Selamat Datang di <IonText color="primary">Gitpedia</IonText>
          </h1>
          <p>Aplikasi belajar Git yang mudah dan menyenangkan</p>
        </IonCol>
      </IonRow>

      <IonRow className="ion-margin-vertical">
        <IonCol>
          <img
            src="/assets/img/software-code-testing-pana.svg"
            alt="Software code testing illustration"
            className={styles.illustration}
          />
        </IonCol>
      </IonRow>

      <IonRow>
        <IonCol>
          <IonButton
            shape="round"
            expand="block"
            color="primary"
            routerLink="/auth/login"
            className={styles.cta}>
            Masuk
          </IonButton>
          <IonButton
            shape="round"
            expand="block"
            color="secondary"
            routerLink="/auth/register"
            className={styles.cta}>
            Daftar
          </IonButton>
        </IonCol>
      </IonRow>

      <IonRow className="ion-margin-vertical">
        <IonCol>
          <IonRouterLink color="primary" routerLink="/about">
            Tentang Aplikasi <IonIcon icon={openOutline} />
          </IonRouterLink>
        </IonCol>
      </IonRow>
    </IonGrid>
  );
};

export default Greeting;
