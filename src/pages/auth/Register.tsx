import { useContext } from 'react';
import { Redirect } from 'react-router-dom';

import { Layout } from 'components/layouts';
import { RegisterForm } from 'components/organisms';
import { AuthContext } from 'contexts/auth';

const Register = () => {
  const authCtx = useContext(AuthContext);

  if (authCtx.user && authCtx.user.emailVerified) {
    return <Redirect exact to="/main" />;
  }

  return (
    <Layout>
      <RegisterForm />
    </Layout>
  );
};

export default Register;
