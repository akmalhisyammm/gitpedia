import { useContext } from 'react';
import { IonCol, IonGrid, IonIcon, IonRow, IonText, useIonToast } from '@ionic/react';
import { alertCircle, openOutline } from 'ionicons/icons';

import { CODING_ILLUSTRATION_URL } from 'constants/images';
import { UserContext } from 'contexts/user';
import { CustomImage, CustomLink } from 'components/atoms';

import styles from './AboutContent.module.scss';

const AboutContent = () => {
  const userCtx = useContext(UserContext);

  const [presentToast] = useIonToast();

  const handleEasterEgg = async () => {
    if (!userCtx.user || userCtx.user.progress.isEasterEggDone) return;

    try {
      await userCtx.updateProgress({
        ...userCtx.user.progress,
        totalCoins: userCtx.user.progress.totalCoins + 500,
        isEasterEggDone: true,
      });
    } catch (error) {
      if (error instanceof Error) {
        presentToast({
          mode: 'ios',
          message: error.message,
          color: 'danger',
          duration: 2000,
          icon: alertCircle,
        });
      }
    }
  };

  return (
    <IonGrid>
      <IonRow className={styles.section}>
        <IonCol>
          <IonText>
            <p>
              <IonText color="primary" className={styles.brand}>
                Gitpedia
              </IonText>{' '}
              merupakan aplikasi pembelajaran Git yang dibangun untuk membantu para pengembang dalam
              mempelajari Git dengan mudah dan menyenangkan.
            </p>
          </IonText>
        </IonCol>
      </IonRow>

      <IonRow className={styles.section}>
        <IonCol>
          <IonText>
            <h3>Pembuatan Aplikasi</h3>
          </IonText>
          <CustomImage src={CODING_ILLUSTRATION_URL} alt="Coding" className={styles.illustration} />
          <IonText>
            <p>
              Gitpedia dibangun sebagai proyek penelitian skripsi yang ditujukan untuk meraih gelar
              Sarjana Komputer.
            </p>
            <p>
              Aplikasi ini dirancang menggunakan metode gamifikasi untuk meningkatkan motivasi
              pengguna dalam belajar dan algoritma Fisher-Yates Shuffle untuk mengacak soal-soal
              kuis secara variatif.
            </p>
            <p>
              Teknologi yang digunakan dalam pembuatan aplikasi ini yaitu Ionic, React, dan
              Firebase.
            </p>
          </IonText>
        </IonCol>
      </IonRow>

      <IonRow className={styles.section}>
        <IonCol>
          <IonText>
            <h3>Referensi</h3>
            <p>Aset Gambar:</p>
            <ul>
              <li>Freepik</li>
              <li>Flaticon</li>
            </ul>
            <p>Sumber Materi:</p>
            <ul>
              <li>Dokumentasi Git</li>
            </ul>
          </IonText>
        </IonCol>
      </IonRow>

      <IonRow className="ion-text-center ion-margin-vertical">
        <IonCol>
          <IonText>&copy; 2023 &bull; </IonText>
          <CustomLink
            href="https://akmalhisyam.my.id"
            color="primary"
            isExternal
            onClick={handleEasterEgg}>
            Muhammad Akmal Hisyam <IonIcon icon={openOutline} />
          </CustomLink>
        </IonCol>
      </IonRow>
    </IonGrid>
  );
};

export default AboutContent;
