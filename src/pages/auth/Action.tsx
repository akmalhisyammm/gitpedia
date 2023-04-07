import { Redirect, useLocation } from 'react-router-dom';

import { Layout } from 'components/layouts';
import { ResetPasswordForm, VerifyEmailForm } from 'components/organisms';

const Action = () => {
  const query = new URLSearchParams(useLocation().search);

  if (!query.get('mode') && !query.get('oobCode')) {
    return <Redirect exact to="/auth/login" />;
  }

  return (
    <Layout>
      {query.get('mode') === 'verifyEmail' ? (
        <VerifyEmailForm oobCode={String(query.get('oobCode'))} />
      ) : (
        <ResetPasswordForm oobCode={String(query.get('oobCode'))} />
      )}
    </Layout>
  );
};

export default Action;
