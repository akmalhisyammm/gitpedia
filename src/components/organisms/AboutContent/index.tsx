import { IonCol, IonGrid, IonIcon, IonRouterLink, IonRow, IonText } from '@ionic/react';
import { openOutline } from 'ionicons/icons';

import { CustomImage } from 'components/atoms';

import styles from './AboutContent.module.scss';

const AboutContent = () => {
  return (
    <IonGrid>
      <IonRow className={styles.section}>
        <IonCol>
          <IonText>
            <p>
              <IonText color="primary" style={{ fontWeight: 700 }}>
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
          <CustomImage
            src="https://firebasestorage.googleapis.com/v0/b/gitpedia-dev.appspot.com/o/illustrations%2Fcoding.svg?alt=media&token=ae2478ff-3235-43d6-a5d2-5541d6946e8b"
            alt="Coding"
            className={styles.illustration}
          />
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
          <IonRouterLink
            href="https://akmalhisyam.my.id"
            color="primary"
            target="_blank"
            rel="noopener noreferrer">
            Muhammad Akmal Hisyam <IonIcon icon={openOutline} />
          </IonRouterLink>
        </IonCol>
      </IonRow>
    </IonGrid>
  );
};

export default AboutContent;
