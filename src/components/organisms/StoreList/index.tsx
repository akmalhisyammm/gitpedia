import { useContext, useEffect, useState } from 'react';
import {
  IonGrid,
  IonRow,
  IonCol,
  IonText,
  useIonToast,
  useIonLoading,
  useIonAlert,
} from '@ionic/react';
import { alertCircle, checkmarkCircle } from 'ionicons/icons';

import { StoreContext } from 'contexts/store';
import { UserContext } from 'contexts/user';
import { StoreCard } from 'components/molecules';

import type { IStoreItem } from 'types/store';

import styles from './StoreList.module.scss';

const StoreList = () => {
  const [availableItems, setAvailableItems] = useState<IStoreItem[]>([]);
  const [purchasedItems, setPurchasedItems] = useState<IStoreItem[]>([]);

  const [presentToast] = useIonToast();
  const [presentAlert] = useIonAlert();
  const [presentLoading, dismissLoading] = useIonLoading();

  const storeCtx = useContext(StoreContext);
  const userCtx = useContext(UserContext);

  const handleBuyItem = (item: IStoreItem) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { price: _, ...payload } = item;

    presentAlert({
      mode: 'ios',
      header: 'Konfirmasi Pembelian',
      message: `Apakah kamu yakin ingin membeli ${
        item.type === 'avatar' ? 'avatar' : 'bingkai'
      } ini?`,
      buttons: [
        {
          text: 'Batal',
          role: 'cancel',
        },
        {
          text: 'Beli',
          handler: async () => {
            if (!userCtx.user) return;

            if (userCtx.user.progress.totalCoins < item.price) {
              return presentToast({
                mode: 'ios',
                message: 'Koin kamu tidak cukup!',
                color: 'danger',
                duration: 2000,
                icon: alertCircle,
              });
            }

            try {
              presentLoading({ mode: 'ios', spinner: 'crescent' });

              await userCtx.addItem(payload);
              await userCtx.updateProgress({
                ...userCtx.user.progress,
                totalCoins: userCtx.user.progress.totalCoins - item.price,
              });

              presentToast({
                mode: 'ios',
                message: `Berhasil membeli ${item.type === 'avatar' ? 'avatar' : 'bingkai'}!`,
                color: 'success',
                duration: 2000,
                icon: checkmarkCircle,
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
            } finally {
              dismissLoading();
            }
          },
        },
      ],
    });
  };

  useEffect(() => {
    const available = storeCtx.items
      .filter((item) => !userCtx.user?.items.some((i) => i.id === item.id))
      .sort((a, b) => a.price - b.price);
    const purchased = storeCtx.items
      .filter((item) => userCtx.user?.items.some((i) => i.id === item.id))
      .sort((a, b) => a.price - b.price);

    setAvailableItems(available);
    setPurchasedItems(purchased);
  }, [userCtx.user?.items, storeCtx.items]);

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
        {availableItems
          .filter((item) => item.type === 'avatar')
          .map((item) => {
            if (!userCtx.user) return null;

            return (
              <IonCol size="6" key={item.id}>
                <div onClick={() => handleBuyItem(item)}>
                  <StoreCard title={item.name} price={item.price} thumbnail={item.thumbnail} />
                </div>
              </IonCol>
            );
          })}
        {purchasedItems
          .filter((item) => item.type === 'avatar')
          .map((item) => (
            <IonCol size="6" key={item.id}>
              <StoreCard
                title={item.name}
                price={item.price}
                thumbnail={item.thumbnail}
                isPurchased
              />
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
        {availableItems
          .filter((item) => item.type === 'frame')
          .map((item) => {
            if (!userCtx.user) return null;

            return (
              <IonCol size="6" key={item.id}>
                <div onClick={() => handleBuyItem(item)}>
                  <StoreCard title={item.name} price={item.price} thumbnail={item.thumbnail} />
                </div>
              </IonCol>
            );
          })}
        {purchasedItems
          .filter((item) => item.type === 'frame')
          .map((item) => (
            <IonCol size="6" key={item.id}>
              <StoreCard
                title={item.name}
                price={item.price}
                thumbnail={item.thumbnail}
                isPurchased
              />
            </IonCol>
          ))}
      </IonRow>
    </IonGrid>
  );
};

export default StoreList;
