import { IonGrid, IonRow, IonCol, IonText, IonIcon } from '@ionic/react';
import { openOutline } from 'ionicons/icons';

import { CustomButton, CustomImage, CustomLink } from 'components/atoms';

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
          <CustomButton href="/auth/login" color="primary" className={styles.cta}>
            Masuk
          </CustomButton>
          <CustomButton href="/auth/register" color="secondary" className={styles.cta}>
            Daftar
          </CustomButton>
        </IonCol>
      </IonRow>

      <IonRow className="ion-margin-vertical">
        <IonCol>
          <CustomLink href="/about" color="primary">
            Tentang Aplikasi <IonIcon icon={openOutline} />
          </CustomLink>
        </IonCol>
      </IonRow>
    </IonGrid>
  );
};

export default Greeting;
