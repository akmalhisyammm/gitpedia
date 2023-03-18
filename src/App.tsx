import { IonApp, IonSplitPane, setupIonicReact } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';

import Routes from 'router';

import { SideMenu } from 'components/layouts';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Themes */
import 'theme/variables.css';
import 'theme/globals.css';

setupIonicReact();

const App = () => (
  <IonApp>
    <IonReactRouter>
      <IonSplitPane contentId="main">
        <SideMenu />
        <Routes />
      </IonSplitPane>
    </IonReactRouter>
  </IonApp>
);

export default App;
