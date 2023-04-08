import { useContext } from 'react';
import {
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardSubtitle,
  IonCardContent,
  IonText,
} from '@ionic/react';

import { COIN_ICON_URL } from 'constants/images';
import { UserContext } from 'contexts/user';
import { CustomButton, CustomImage } from 'components/atoms';

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
              <CustomImage src={COIN_ICON_URL} alt="Coin" className={styles.icon} />
              <IonText>
                <h2>{userCtx.user.progress.totalCoins}</h2>
              </IonText>
            </div>
          </div>
          <CustomButton href="/main/store" color="primary">
            Toko
          </CustomButton>
        </div>
      </IonCardContent>
    </IonCard>
  );
};

export default Hero;
