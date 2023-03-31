import { useContext } from 'react';
import {
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardSubtitle,
  IonCardContent,
  IonText,
} from '@ionic/react';

import { CustomButton, CustomImage } from 'components/atoms';
import { UserContext } from 'contexts/user';

import styles from './Hero.module.scss';

const Hero = () => {
  const userCtx = useContext(UserContext);

  if (!userCtx.user) return null;

  return (
    <IonCard color="tertiary">
      <IonCardHeader>
        <IonCardTitle>Halo, {userCtx.user.name.split(' ')[0]}</IonCardTitle>
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
                <h2>{userCtx.user.progress.totalCoins}</h2>
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
