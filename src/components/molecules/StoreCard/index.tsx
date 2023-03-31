import { IonCard, IonCardTitle, IonCardContent } from '@ionic/react';

import { CustomImage } from 'components/atoms';

import styles from './StoreCard.module.scss';

type StoreCardProps = {
  title: string;
  price: number;
  thumbnail: string;
};

const StoreCard = ({ title, price, thumbnail }: StoreCardProps) => {
  return (
    <IonCard color="secondary" className={styles.wrapper}>
      <CustomImage src={thumbnail} alt={title} className={styles.image} />
      <IonCardContent>
        <div className={styles.content}>
          <IonCardTitle>{price}</IonCardTitle>
          <CustomImage src="/assets/icon/coin.png" alt="Coin" className={styles.icon} />
        </div>
      </IonCardContent>
    </IonCard>
  );
};

export default StoreCard;
