import { IonCard, IonCardTitle, IonCardContent } from '@ionic/react';

import { CustomImage } from 'components/atoms';

import styles from './StoreCard.module.scss';

type StoreCardProps = {
  title: string;
  price: number;
  image: string;
};

const StoreCard = ({ title, price, image }: StoreCardProps) => {
  return (
    <IonCard color="secondary" className={styles.wrapper}>
      <CustomImage src={image} alt={title} className={styles.image} />
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
