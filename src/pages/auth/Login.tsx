import { useState } from 'react';

import { Layout } from 'components/layouts';
import { ForgotPasswordModal, LoginForm } from 'components/organisms';

const Login = () => {
  const [isForgotPassword, setIsForgotPassword] = useState<boolean>(false);

  const handleRequestPasswordReset = async () => {
    console.log('Request Password Reset');
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
