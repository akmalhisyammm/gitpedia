import { useState } from 'react';

import { ForgotPasswordModal, LoginForm } from 'components/organisms';
import Layout from 'components/layout';

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
