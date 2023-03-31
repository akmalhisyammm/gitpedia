import { useContext } from 'react';
import { IonGrid, IonRow, IonCol, IonText } from '@ionic/react';

import { StoreContext } from 'contexts/store';
import { StoreCard } from 'components/molecules';

import styles from './StoreList.module.scss';

const StoreList = () => {
  const storeCtx = useContext(StoreContext);

  return (
    <IonGrid>
      <IonRow className="ion-margin-bottom">
        <IonCol size="12">
          <IonText>
            <h4 className={styles.title}>Avatar</h4>
          </IonText>
          <IonText color="medium">
            <small>Beli avatar untuk digunakan pada profil kamu.</small>
          </IonText>
        </IonCol>
        {storeCtx.items
          .filter((item) => item.type === 'avatar')
          .sort((a, b) => a.price - b.price)
          .map((item) => (
            <IonCol size="6" key={item.id}>
              <StoreCard title={item.name} price={item.price} thumbnail={item.thumbnail} />
            </IonCol>
          ))}
      </IonRow>
      <IonRow>
        <IonCol size="12">
          <IonText>
            <h4 className={styles.title}>Bingkai</h4>
          </IonText>
          <IonText color="medium">
            <small>Beli bingkai untuk digunakan pada profil kamu.</small>
          </IonText>
        </IonCol>
        {storeCtx.items
          .filter((item) => item.type === 'frame')
          .sort((a, b) => a.price - b.price)
          .map((item) => (
            <IonCol size="6" key={item.id}>
              <StoreCard title={item.name} price={item.price} thumbnail={item.thumbnail} />
            </IonCol>
          ))}
      </IonRow>
    </IonGrid>
  );
};

export default StoreList;
