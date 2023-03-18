import { IonTabs, IonRouterOutlet, IonTabBar, IonTabButton, IonIcon, IonLabel } from '@ionic/react';
import { home, storefront, statsChart, person } from 'ionicons/icons';
import { Redirect, Route } from 'react-router-dom';

import Home from 'pages/main/Home';
import Store from 'pages/main/Store';
import Leaderboard from 'pages/main/Leaderboard';
import Profile from 'pages/main/Profile';

const MainTabs = () => {
  return (
    <IonTabs>
      <IonRouterOutlet>
        <Redirect exact from="/main" to="/main/home" />
        <Route path="/main/home" component={Home} />
        <Route path="/main/store" component={Store} />
        <Route path="/main/leaderboard" component={Leaderboard} />
        <Route path="/main/profile" component={Profile} />
      </IonRouterOutlet>

      <IonTabBar slot="bottom" color="tertiary">
        <IonTabButton tab="home" href="/main/home">
          <IonIcon icon={home} />
          <IonLabel>Beranda</IonLabel>
        </IonTabButton>
        <IonTabButton tab="store" href="/main/store">
          <IonIcon icon={storefront} />
          <IonLabel>Toko</IonLabel>
        </IonTabButton>
        <IonTabButton tab="leaderboard" href="/main/leaderboard">
          <IonIcon icon={statsChart} />
          <IonLabel>Peringkat</IonLabel>
        </IonTabButton>
        <IonTabButton tab="profile" href="/main/profile">
          <IonIcon icon={person} />
          <IonLabel>Profil</IonLabel>
        </IonTabButton>
      </IonTabBar>
    </IonTabs>
  );
};

export default MainTabs;
