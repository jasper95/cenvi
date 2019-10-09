import React, { useEffect } from 'react';
import { Redirect } from 'react-router';
import { useSelector, useDispatch } from 'react-redux';
import { createSelector } from 'redux-starter-kit';
import { authRequest } from 'shared/redux/auth/reducer';

export const authSelector = createSelector(
  state => state.auth.user,
  state => state.auth.sessionLoading,
  state => state.auth.sessionRequested,
  (auth, sessionLoading, sessionRequested) => ({
    auth,
    sessionLoading,
    sessionRequested,
  }),
);

const withAuth = (WrappedComponent) => {
  function Auth(props) {
    const dispatch = useDispatch();
    const { requireAuth } = props;
    const { auth, sessionLoading, sessionRequested } = useSelector(authSelector);
    useEffect(() => {
      if (!sessionRequested) {
        dispatch(authRequest());
      }
    }, []);
    if ((!sessionRequested && !auth) || (sessionLoading && requireAuth !== 'optional')) {
      return (<span>Loading...</span>);
    }
    if (!auth && sessionRequested && requireAuth === true) {
      return (<Redirect to="/login" />);
    }
    if (auth && requireAuth === false) {
      return (<Redirect to="/" />);
    }
    return (
      <WrappedComponent {...props} />
    );
  }

  return Auth;
};

export default withAuth;
