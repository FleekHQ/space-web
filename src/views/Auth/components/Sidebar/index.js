import React from 'react';
import clsx from 'clsx';

import Box from '@material-ui/core/Box';
import Link from '@material-ui/core/Link';
import List from '@material-ui/core/List';
import Drawer from '@material-ui/core/Drawer';
import Toolbar from '@material-ui/core/Toolbar';
import ListItem from '@material-ui/core/ListItem';

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
        <List>
          {
            sidebar.links.map((link) => (
              <li key={link.id}>
                <ListItem
                  button
                  underline="none"
                  href={link.to}
                  component={Link}
                  classes={{
                    button: classes.itemBtn,
                  }}
                >
                  <Box component="span" color="white" fontSize={20} fontWeight={500}>
                    {link.name}
                  </Box>
                </ListItem>
              </li>
            ))
          }
        </List>
      </Box>
    </Drawer>
  );
};

export default Sidebar;
