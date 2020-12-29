import React from 'react';
import PropTypes from 'prop-types';

import Box from '@material-ui/core/Box';
import Toolbar from '@material-ui/core/Toolbar';

import TopBar from '../TopBar';
import Sidebar from '../Sidebar';
import { SidebarContextProvider } from '../../../../contexts';

const AuthLayout = ({ children }) => (
  <SidebarContextProvider>
    <Box display="flex" height="inherit">
      <TopBar />
      <Sidebar />
      <Box component="main" flexGrow={1}>
        <Toolbar />
        {children}
      </Box>
    </Box>
  </SidebarContextProvider>
);

AuthLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AuthLayout;
