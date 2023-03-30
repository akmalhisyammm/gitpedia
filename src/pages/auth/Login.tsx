import { useContext, useState } from 'react';
import { useIonLoading, useIonToast } from '@ionic/react';

import { AuthContext } from 'contexts/auth';
import { Layout } from 'components/layouts';
import { ForgotPasswordModal, LoginForm } from 'components/organisms';
import { alertCircle } from 'ionicons/icons';

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
