import React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';

import Box from '@material-ui/core/Box';

import { sdk } from '@clients';
import registerTxlSubscribeEvents from '@events/txl-subscribe';
// import registerNotificationEvents from '@events/notifications-subscribe';

import Splash from '../../../views/Splash';

// disable react/jsx-props-no-spreading since it is a wrapper
/* eslint-disable react/jsx-props-no-spreading */
const PrivateRoute = ({ children, txlSubscribe, ...rest }) => {
  const user = useSelector((state) => state.user);
  const [loadingSdk, setLoadingSdk] = React.useState(true);

  React.useEffect(() => {
    let sdkUnsubscribe;
    let txlUnsubscribe;
    // let notificationUnsubscribe;

    const initTxlSubscribe = async () => {
      const users = await sdk.getUsers();
      if (users.list().length > 0) {
        txlUnsubscribe = await registerTxlSubscribeEvents();
        // notificationUnsubscribe = await registerNotificationEvents();
      }
    };

    if (sdk.isStarting) {
      sdkUnsubscribe = sdk.onListen('ready', (error) => {
        if (!error) {
          setLoadingSdk(false);
          sdkUnsubscribe();

          if (txlSubscribe) {
            initTxlSubscribe();
          }
        }
      });
    } else {
      // SDK is already started
      setLoadingSdk(false);
      if (txlSubscribe) {
        initTxlSubscribe();
      }
    }

    return () => {
      if (sdkUnsubscribe) {
        sdkUnsubscribe();
      }
      if (txlUnsubscribe) {
        txlUnsubscribe();
      }
      // if (notificationUnsubscribe) {
      //   notificationUnsubscribe();
      // }
    };
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

PrivateRoute.defaultProps = {
  txlSubscribe: false,
};

PrivateRoute.propTypes = {
  txlSubscribe: PropTypes.bool,
  children: PropTypes.node.isRequired,
};

export default PrivateRoute;
