import {
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardSubtitle,
  IonCardContent,
  IonText,
} from '@ionic/react';

import { CustomButton, CustomImage } from 'components/atoms';

import styles from './Hero.module.scss';

const Hero = () => {
  return (
    <IonCard color="tertiary">
      <IonCardHeader>
        <IonCardTitle>Halo, John Doe</IonCardTitle>
        <IonCardSubtitle>Siap belajar hari ini?</IonCardSubtitle>
      </IonCardHeader>
      <IonCardContent>
        <div className={styles.content}>
          <div>
            <IonText>
              <p>Koin Kamu</p>
            </IonText>
            <div className={styles.coinInfo}>
              <CustomImage src="/assets/icon/coin.png" alt="Coin" className={styles.icon} />
              <IonText>
                <h2>100</h2>
              </IonText>
            </div>
          </div>
          <CustomButton color="primary">Toko</CustomButton>
        </div>
      </IonCardContent>
    </IonCard>
  );
};

export default Hero;
