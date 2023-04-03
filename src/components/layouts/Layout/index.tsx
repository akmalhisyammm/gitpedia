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
  isMenuButton?: boolean;
  children: React.ReactNode;
};

const Layout = ({ title, isMenuButton, children }: LayoutProps) => {
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

      <IonContent>{children}</IonContent>
    </IonPage>
  );
};

export default Layout;
