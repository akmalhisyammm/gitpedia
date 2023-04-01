import { useContext } from 'react';
import { Redirect } from 'react-router-dom';

import { Layout } from 'components/layouts';
import { RegisterForm } from 'components/organisms';
import { AuthContext } from 'contexts/auth';

const Register = () => {
  const authCtx = useContext(AuthContext);

  if (authCtx.user) {
    return <Redirect exact to="/main" />;
  }

  return (
    <Layout>
      <RegisterForm />
    </Layout>
  );
};

export default Register;
