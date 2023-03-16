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
} from '@ionic/react';
import { informationCircle, logIn, personAdd } from 'ionicons/icons';

const SideMenu = () => {
  return (
    <IonMenu contentId="main">
      <IonHeader>
        <IonToolbar color="tertiary">
          <IonTitle>Gitpedia</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent>
        <IonList>
          <IonMenuToggle autoHide={false}>
            <IonItem button routerLink="/login">
              <IonIcon slot="start" color="tertiary" icon={logIn} />
              <IonLabel>Masuk</IonLabel>
            </IonItem>
            <IonItem button routerLink="/register">
              <IonIcon slot="start" color="tertiary" icon={personAdd} />
              <IonLabel>Daftar</IonLabel>
            </IonItem>
            <IonItem button routerLink="/about">
              <IonIcon slot="start" color="tertiary" icon={informationCircle} />
              <IonLabel>Tentang</IonLabel>
            </IonItem>
          </IonMenuToggle>
        </IonList>
      </IonContent>
    </IonMenu>
  );
};

export default SideMenu;
