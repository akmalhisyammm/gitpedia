import { useContext } from 'react';
import { Redirect, Route } from 'react-router-dom';
import { IonRouterOutlet } from '@ionic/react';

import PrivateRoute from './PrivateRoute';
import Onboarding from 'pages/Onboarding';
import About from 'pages/About';
import Login from 'pages/auth/Login';
import Register from 'pages/auth/Register';
import Chapter from 'pages/learn/Chapter';
import Lesson from 'pages/learn/Lesson';
import Player from 'pages/player/Player';
import EditProfile from 'pages/player/EditProfile';
import { AuthContext } from 'contexts/auth';
import { MainTabs } from 'components/layouts';

const Routes = () => {
  const authCtx = useContext(AuthContext);

  return (
    <IonRouterOutlet id="main">
      <Route exact path="/" component={Onboarding} />
      <Route path="/about" component={About} />
      <Route path="/auth/login" component={Login} />
      <Route path="/auth/register" component={Register} />

      <PrivateRoute path="/main" component={MainTabs} />
      <PrivateRoute exact path="/learn/:chapterId" component={Chapter} />
      <PrivateRoute path="/learn/:chapterId/:lessonId" component={Lesson} />
      <PrivateRoute path="/player/:playerId" component={Player} />
      <PrivateRoute path="/player/edit" component={EditProfile} />

      {authCtx.user ? (
        <>
          <Redirect exact from="/" to="/main" />
          <Redirect exact from="/auth/login" to="/main" />
          <Redirect exact from="/auth/register" to="/main" />
        </>
      ) : (
        <Redirect exact to="/" />
      )}
    </IonRouterOutlet>
  );
};

export default Routes;
