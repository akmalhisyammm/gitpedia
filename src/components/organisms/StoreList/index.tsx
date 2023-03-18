import { IonGrid, IonRow, IonCol, IonText } from '@ionic/react';

import { StoreCard } from 'components/molecules';

import styles from './StoreList.module.scss';

const ITEMS = [
  {
    id: 1,
    title: 'Strip Frame',
    price: 150,
    image: '/assets/icon/strip-frame.png',
  },
  {
    id: 2,
    title: 'Technology Frame',
    price: 200,
    image: '/assets/icon/technology-frame.png',
  },
  {
    id: 3,
    title: 'Rainbow Frame',
    price: 250,
    image: '/assets/icon/rainbow-frame.png',
  },
  {
    id: 4,
    title: 'Colorful Frame',
    price: 300,
    image: '/assets/icon/colorful-frame.png',
  },
];

const StoreList = () => {
  return (
    <IonGrid>
      <IonRow>
        <IonCol size="12">
          <IonText>
            <h4 className={styles.title}>Bingkai</h4>
          </IonText>
          <IonText color="medium">
            <small>Beli bingkai untuk digunakan pada profil kamu.</small>
          </IonText>
        </IonCol>
        {ITEMS.map((item) => (
          <IonCol size="6" key={item.id}>
            <StoreCard title={item.title} price={item.price} image={item.image} />
          </IonCol>
        ))}
      </IonRow>
    </IonGrid>
  );
};

export default StoreList;
