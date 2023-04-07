import { useContext } from 'react';
import { Redirect, Route } from 'react-router-dom';
import { IonRouterOutlet } from '@ionic/react';

import PrivateRoute from './PrivateRoute';
import Onboarding from 'pages/Onboarding';
import About from 'pages/About';
import Login from 'pages/auth/Login';
import Register from 'pages/auth/Register';
import Action from 'pages/auth/Action';
import Chapter from 'pages/learn/Chapter';
import Lesson from 'pages/learn/Lesson';
import Quiz from 'pages/learn/Quiz';
import OthersProfile from 'pages/user/OthersProfile';
import EditProfile from 'pages/user/EditProfile';
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
      <Route path="/auth/action" component={Action} />

      <PrivateRoute path="/main" component={MainTabs} />
      <PrivateRoute exact path="/learn/:chapterId" component={Chapter} />
      <PrivateRoute exact path="/learn/:chapterId/:lessonId" component={Lesson} />
      <PrivateRoute path="/learn/:chapterId/:lessonId/quiz" component={Quiz} />
      <PrivateRoute path="/user/:userId" component={OthersProfile} />
      <PrivateRoute path="/user/edit" component={EditProfile} />

      {authCtx.user && authCtx.user.emailVerified ? (
        <Redirect exact from="/" to="/main" />
      ) : (
        <Redirect exact to="/" />
      )}
    </IonRouterOutlet>
  );
};

export default Routes;
