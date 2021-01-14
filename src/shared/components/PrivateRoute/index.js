import React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';

import Box from '@material-ui/core/Box';

import { sdk } from '@clients';

import Splash from '../../../views/Splash';

// disable react/jsx-props-no-spreading since it is a wrapper
/* eslint-disable react/jsx-props-no-spreading */
const PrivateRoute = ({ children, ...rest }) => {
  const user = useSelector((state) => state.user);
  const [loadingSdk, setLoadingSdk] = React.useState(true);

  React.useEffect(() => {
    const initSdk = async () => {
      await sdk.getUsers();
      setLoadingSdk(false);
    };

    initSdk();
  }, []);

  return (
    <Route
      {...rest}
      render={() => {
        if (!user) {
          return (
            <Redirect to="/signup" />
          );
        }

        if (loadingSdk) {
          return (
            <Box
              display="flex"
              width="100%"
              height="100vh"
              position="absolute"
              zIndex={9999}
              justifyContent="center"
            >
              <Splash />
            </Box>
          );
        }

        return children;
      }}
    />
  );
};

PrivateRoute.propTypes = {
  children: PropTypes.node.isRequired,
};

export default PrivateRoute;
