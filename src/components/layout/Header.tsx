import {
  IonBackButton,
  IonButtons,
  IonHeader,
  IonMenuButton,
  IonTitle,
  IonToolbar,
} from '@ionic/react';

type HeaderProps = {
  title: string;
};

const Header = ({ title }: HeaderProps) => {
  return (
    <IonHeader>
      <IonToolbar color="primary">
        <IonTitle>{title}</IonTitle>

        <IonButtons slot="start">
          {title === 'Beranda' ||
          title === 'Toko' ||
          title === 'Peringkat' ||
          title === 'Profil' ? (
            <IonMenuButton />
          ) : (
            <IonBackButton defaultHref="/" />
          )}
        </IonButtons>
      </IonToolbar>
    </IonHeader>
  );
};

export default Header;
