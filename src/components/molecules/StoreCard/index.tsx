import { IonCard, IonCardTitle, IonCardContent, IonRippleEffect } from '@ionic/react';

import { COIN_ICON_URL } from 'constants/images';
import { CustomImage } from 'components/atoms';

import styles from './StoreCard.module.scss';

type StoreCardProps = {
  title: string;
  price: number;
  thumbnail: string;
  isPurchased?: boolean;
};

const StoreCard = ({ title, price, thumbnail, isPurchased }: StoreCardProps) => {
  return (
    <IonCard
      color="secondary"
      className={`${styles.wrapper} ion-activatable ripple-parent rounded-rectangle`}
      style={{ filter: isPurchased && 'grayscale(100%)' }}>
      {!isPurchased && <IonRippleEffect />}
      <CustomImage src={thumbnail} alt={title} className={styles.image} />
      <IonCardContent>
        {!isPurchased ? (
          <div className={styles.content}>
            <IonCardTitle>{price}</IonCardTitle>
            <CustomImage src={COIN_ICON_URL} alt="Coin" className={styles.icon} />
          </div>
        ) : (
          <div className={styles.content}>
            <IonCardTitle>Terjual</IonCardTitle>
          </div>
        )}
      </IonCardContent>
    </IonCard>
  );
};

export default StoreCard;
