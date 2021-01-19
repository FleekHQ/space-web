import React from 'react';
import PropTypes from 'prop-types';

import Box from '@material-ui/core/Box';
import Toolbar from '@material-ui/core/Toolbar';

import TopBar from '../TopBar';
import Sidebar from '../Sidebar';
import useStyles from './styles';
import { SidebarContextProvider } from '../../../../contexts';

const AuthLayout = ({ children }) => {
  const classes = useStyles();

  return (
    <SidebarContextProvider>
      <Box display="flex" height="inherit" className={classes.root}>
        <Box display="flex" height="inherit" className={classes.opacity}>
          <TopBar />
          <Sidebar />
          <Box component="main" flexGrow={1}>
            <Toolbar />
            {children}
          </Box>
        </Box>
      </Box>
    </SidebarContextProvider>
  );
};

AuthLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AuthLayout;
