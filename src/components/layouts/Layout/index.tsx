import { useContext } from 'react';
import {
  IonBackButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonMenuButton,
  IonPage,
  IonRefresher,
  IonRefresherContent,
  IonTitle,
  IonToolbar,
  type RefresherEventDetail,
} from '@ionic/react';

import { UserContext } from 'contexts/user';

type LayoutProps = {
  title?: string;
  isMenuButton?: boolean;
  children: React.ReactNode;
};

const Layout = ({ title, isMenuButton, children }: LayoutProps) => {
  const userCtx = useContext(UserContext);

  const handleRefresh = async (e: CustomEvent<RefresherEventDetail>) => {
    await userCtx.getAllUsers();
    await userCtx.getAuthUser();

    e.detail.complete();
  };

  return (
    <IonPage>
      {title && (
        <IonHeader>
          <IonToolbar color="tertiary">
            <IonButtons slot="start">
              {isMenuButton ? <IonMenuButton /> : <IonBackButton defaultHref="/" />}
            </IonButtons>
            <IonTitle>{title}</IonTitle>
          </IonToolbar>
        </IonHeader>
      )}

      <IonContent>
        <IonRefresher slot="fixed" onIonRefresh={handleRefresh}>
          <IonRefresherContent />
        </IonRefresher>
        {children}
      </IonContent>
    </IonPage>
  );
};

export default Layout;
