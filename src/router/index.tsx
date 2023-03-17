import { IonRouterOutlet } from '@ionic/react';
import { Redirect, Route } from 'react-router-dom';

import { MainTabs } from 'components/organisms';
import Onboarding from 'pages/Onboarding';
import About from 'pages/About';
import Login from 'pages/auth/Login';
import Register from 'pages/auth/Register';
import Chapter from 'pages/learn/Chapter';
import Lesson from 'pages/learn/Lesson';
import Quiz from 'pages/learn/Quiz';

const Routes = () => {
  return (
    <IonRouterOutlet id="main">
      <Route exact path="/" component={Onboarding} />
      <Route path="/about" component={About} />
      <Route path="/main" component={MainTabs} />
      <Route path="/auth/login" component={Login} />
      <Route path="/auth/register" component={Register} />
      <Route exact path="/learn/:chapterId" component={Chapter} />
      <Route exact path="/learn/:chapterId/:lessonId" component={Lesson} />
      <Route path="/learn/:chapterId/:lessonId/quiz" component={Quiz} />

      <Redirect exact from="/auth" to="/auth/login" />
    </IonRouterOutlet>
  );
};

export default Routes;
