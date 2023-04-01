import { useContext } from 'react';
import {
  IonMenu,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonList,
  IonMenuToggle,
  IonItem,
  IonIcon,
  IonLabel,
  useIonToast,
} from '@ionic/react';
import { checkmarkCircle, informationCircle, logIn, logOut, personAdd } from 'ionicons/icons';

import { AuthContext } from 'contexts/auth';

const SideMenu = () => {
  const [presentToast] = useIonToast();

  const authCtx = useContext(AuthContext);

  const handleLogout = async () => {
    await authCtx.logout();

    presentToast({
      mode: 'ios',
      message: 'Berhasil keluar!',
      color: 'success',
      duration: 2000,
      icon: checkmarkCircle,
    });
  };

  return (
    <IonMenu contentId="main">
      <IonHeader>
        <IonToolbar color="primary">
          <IonTitle>Gitpedia</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent>
        <IonList>
          <IonMenuToggle autoHide={false}>
            {authCtx.user ? (
              <IonItem button onClick={handleLogout}>
                <IonIcon slot="start" color="primary" icon={logOut} />
                <IonLabel>Keluar</IonLabel>
              </IonItem>
            ) : (
              <>
                <IonItem button routerLink="/auth/login">
                  <IonIcon slot="start" color="primary" icon={logIn} />
                  <IonLabel>Masuk</IonLabel>
                </IonItem>
                <IonItem button routerLink="/auth/register">
                  <IonIcon slot="start" color="primary" icon={personAdd} />
                  <IonLabel>Daftar</IonLabel>
                </IonItem>
              </>
            )}
            <IonItem button routerLink="/about">
              <IonIcon slot="start" color="primary" icon={informationCircle} />
              <IonLabel>Tentang</IonLabel>
            </IonItem>
          </IonMenuToggle>
        </IonList>
      </IonContent>
    </IonMenu>
  );
};

export default SideMenu;
