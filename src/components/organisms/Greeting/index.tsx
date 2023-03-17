import { IonGrid, IonRow, IonCol, IonText, IonRouterLink, IonIcon } from '@ionic/react';
import { openOutline } from 'ionicons/icons';

import { CustomButton, CustomImage } from 'components/atoms';

import styles from './Greeting.module.scss';

const Greeting = () => {
  return (
    <IonGrid className={styles.wrapper}>
      <IonRow>
        <IonCol>
          <h1 className={styles.title}>
            Selamat Datang di <IonText color="primary">Gitpedia</IonText>
          </h1>
          <p className={styles.subtitle}>Aplikasi belajar Git yang mudah dan menyenangkan</p>
        </IonCol>
      </IonRow>

      <IonRow className="ion-margin-vertical">
        <IonCol>
          <CustomImage
            src="/assets/icon/gitpedia.png"
            alt="Gitpedia"
            className={styles.illustration}
          />
        </IonCol>
      </IonRow>

      <IonRow>
        <IonCol>
          <CustomButton
            shape="round"
            expand="block"
            color="primary"
            routerLink="/auth/login"
            className={styles.cta}>
            Masuk
          </CustomButton>
          <CustomButton
            shape="round"
            expand="block"
            color="secondary"
            routerLink="/auth/register"
            className={styles.cta}>
            Daftar
          </CustomButton>
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
