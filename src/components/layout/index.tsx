import { IonContent, IonPage } from '@ionic/react';

import Header from './Header';

type LayoutProps = {
  title?: string;
  children: React.ReactNode;
};

const Layout = ({ title, children }: LayoutProps) => {
  return (
    <IonPage>
      {title && <Header title={title} />}

      <IonContent>{children}</IonContent>
    </IonPage>
  );
};

export default Layout;
