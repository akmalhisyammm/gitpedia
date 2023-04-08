import { useContext, useState } from 'react';
import { Redirect } from 'react-router-dom';

import { AuthContext } from 'contexts/auth';
import { Layout } from 'components/layouts';
import { ForgotPasswordModal, LoginForm } from 'components/organisms';

const Login = () => {
  const [isForgotPassword, setIsForgotPassword] = useState<boolean>(false);

  const authCtx = useContext(AuthContext);

  if (authCtx.user && authCtx.user.emailVerified) {
    return <Redirect exact to="/main" />;
  }

  return (
    <Layout>
      <LoginForm onForgotPassword={() => setIsForgotPassword(true)} />
      <ForgotPasswordModal isOpen={isForgotPassword} onDismiss={() => setIsForgotPassword(false)} />
    </Layout>
  );
};

export default Login;
