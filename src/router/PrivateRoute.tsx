import { useContext } from 'react';
import { Route, Redirect } from 'react-router-dom';

import { AuthContext } from 'contexts/auth';

type PrivateRouteProps = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  component: React.ComponentType<any>;
  [key: string]: unknown;
};

const PrivateRoute = ({ component: RouteComponent, ...rest }: PrivateRouteProps) => {
  const authCtx = useContext(AuthContext);

  return (
    <Route
      {...rest}
      render={(routeProps) =>
        authCtx.user ? <RouteComponent {...routeProps} /> : <Redirect exact to="/auth/login" />
      }
    />
  );
};

export default PrivateRoute;
