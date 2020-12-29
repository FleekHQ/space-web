import React from 'react';
import clsx from 'clsx';

import Box from '@material-ui/core/Box';
import Drawer from '@material-ui/core/Drawer';
import Toolbar from '@material-ui/core/Toolbar';

import { SidebarContext } from '../../../../contexts';

import useStyles from './styles';

const Sidebar = () => {
  const classes = useStyles();
  const [sidebar, setSidebar] = React.useContext(SidebarContext);

  const handleCloseSidebar = () => {
    setSidebar((prevState) => ({
      ...prevState,
      isExtended: !prevState.isExtended,
    }));
  };

  return (
    <Drawer
      anchor="right"
      open={sidebar.isExtended}
      className={clsx(classes.drawer, {
        [classes.drawerOpen]: sidebar.isExtended,
        [classes.drawerClose]: !sidebar.isExtended,
      })}
      classes={{
        paper: clsx(classes.paper, {
          [classes.drawerOpen]: sidebar.isExtended,
          [classes.drawerClose]: !sidebar.isExtended,
        }),
      }}
      onClose={handleCloseSidebar}
    >
      <Toolbar />
      <Box height="100%" display="flex" flexDirection="column">
        {
          sidebar.links.map((link) => (
            <span key={link.id}>
              {link.name}
            </span>
          ))
        }
      </Box>
    </Drawer>
  );
};

export default Sidebar;
