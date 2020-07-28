import React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';

// disable react/jsx-props-no-spreading since it is a wrapper
/* eslint-disable react/jsx-props-no-spreading */
const PrivateRoute = ({ children, ...rest }) => {
  const user = useSelector((state) => state.user);

  return (
    <Route
      {...rest}
      render={() => {
        if (user) {
          return children;
        }

        return (
          <Redirect to="/auth/signup" />
        );
      }}
    />
  );
};

PrivateRoute.propTypes = {
  children: PropTypes.node.isRequired,
};

export default PrivateRoute;
