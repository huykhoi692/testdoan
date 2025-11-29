import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAppSelector } from 'app/config/store';

export const hasAnyAuthority = (authorities: string[], hasAnyAuthorities: string[]) => {
  if (authorities && authorities.length !== 0) {
    if (hasAnyAuthorities.length === 0) {
      return true;
    }
    return hasAnyAuthorities.some(auth => authorities.includes(auth));
  }
  return false;
};

interface PrivateRouteProps {
  children: React.ReactElement;
  hasAnyAuthorities?: string[];
}

export const PrivateRoute = ({ children, hasAnyAuthorities = [] }: PrivateRouteProps) => {
  const isAuthenticated = useAppSelector(state => state.authentication.isAuthenticated);
  const sessionHasBeenFetched = useAppSelector(state => state.authentication.sessionHasBeenFetched);
  const account = useAppSelector(state => state.authentication.account);
  const isAuthorized = hasAnyAuthority(account.authorities, hasAnyAuthorities);
  const location = useLocation();

  if (!children) {
    throw new Error(`A component needs to be specified for private route for path ${location.pathname}`);
  }

  if (!sessionHasBeenFetched) {
    return <div>Loading...</div>;
  }

  if (isAuthenticated) {
    if (isAuthorized) {
      return children;
    }
    return (
      <div className="insufficient-authority">
        <div className="alert alert-danger">You are not authorized to access this page.</div>
      </div>
    );
  }

  return (
    <Navigate
      to={{
        pathname: '/login',
      }}
      replace
      state={{ from: location }}
    />
  );
};

export default PrivateRoute;
