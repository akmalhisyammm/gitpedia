import { useContext, useState } from 'react';
import { Redirect } from 'react-router-dom';
import { useIonLoading, useIonToast } from '@ionic/react';
import { alertCircle } from 'ionicons/icons';

import { AuthContext } from 'contexts/auth';
import { Layout } from 'components/layouts';
import { ForgotPasswordModal, LoginForm } from 'components/organisms';

const Login = () => {
  const [isForgotPassword, setIsForgotPassword] = useState<boolean>(false);

  const [presentToast] = useIonToast();
  const [presentLoading, dismissLoading] = useIonLoading();

  const authCtx = useContext(AuthContext);

  const handleRequestPasswordReset = async (email: string) => {
    try {
      presentLoading({ mode: 'ios', spinner: 'crescent' });

      await authCtx.resetPassword({ email });
    } catch (error) {
      if (error instanceof Error) {
        presentToast({
          mode: 'ios',
          message: error.message,
          color: 'danger',
          duration: 3000,
          icon: alertCircle,
        });
      }
    } finally {
      dismissLoading();
    }
  };

  if (authCtx.user) {
    return <Redirect exact from="/" to="/main" />;
  }

  return (
    <Layout>
      <LoginForm onForgotPassword={() => setIsForgotPassword(true)} />
      <ForgotPasswordModal
        isOpen={isForgotPassword}
        onRequest={handleRequestPasswordReset}
        onDismiss={() => setIsForgotPassword(false)}
      />
    </Layout>
  );
};

export default Login;
