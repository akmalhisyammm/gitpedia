import {
  IonBackButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonMenuButton,
  IonPage,
  IonTitle,
  IonToolbar,
} from '@ionic/react';

type LayoutProps = {
  title?: string;
  children: React.ReactNode;
};

const Layout = ({ title, children }: LayoutProps) => {
  return (
    <IonPage>
      {title && (
        <IonHeader>
          <IonToolbar color="tertiary">
            <IonButtons slot="start">
              {['Beranda', 'Toko', 'Peringkat', 'Profil'].includes(title) ? (
                <IonMenuButton />
              ) : (
                <IonBackButton defaultHref="/" />
              )}
            </IonButtons>
            <IonTitle>{title}</IonTitle>
          </IonToolbar>
        </IonHeader>
      )}

      <IonContent>{children}</IonContent>
    </IonPage>
  );
};

export default Layout;
