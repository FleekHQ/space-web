import React from 'react';
import clsx from 'clsx';
import { Link as ReactRouterLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/pro-regular-svg-icons/faBars';

import Box from '@material-ui/core/Box';
import Link from '@material-ui/core/Link';
import AppBar from '@material-ui/core/AppBar';
import Hidden from '@material-ui/core/Hidden';
import Button from '@material-ui/core/Button';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';

import { SidebarContext } from '../../../../contexts';

import useStyles from './styles';

const Topbar = () => {
  const classes = useStyles();
  const [sidebarState, setSidebar] = React.useContext(SidebarContext);

  // eslint-disable-next-line no-unused-vars
  const handleMenuClick = (event) => {
    event.preventDefault();

    setSidebar((prevState) => ({
      ...prevState,
      isExtended: !prevState.isExtended,
    }));
  };

  return (
    <AppBar elevation={0} position="fixed" className={classes.appBar}>
      <Toolbar classes={{ root: classes.toolbarRoot }}>
        <Box
          flex={1}
          height={36}
          display="flex"
          alignItems="center"
          justifyContent="space-between"
          fontFamily="Inter"
        >
          <Box ml={2}>
            <Link
              href="/"
              classes={{ root: classes.logoLink }}
            >
              <img height={35} src={`${process.env.PUBLIC_URL}/assets/images/space_text.svg`} alt="logo" />
            </Link>
          </Box>
          <Hidden smDown>
            <Box flex={1} display="flex" justifyContent="center">
              {
                sidebarState.links.map((link) => (
                  <Box key={link.id} component="span" color="white" fontSize={15} px={2} fontWeight={600}>
                    <Link target={link.target} color="inherit" underline="hover" href={link.to}>
                      {link.name}
                    </Link>
                  </Box>
                ))
              }
            </Box>
          </Hidden>
          <Hidden smDown>
            <Box color="white" display="flex">
              <Button
                color="inherit"
                to="/signin"
                component={ReactRouterLink}
                className={classes.authBtnRoot}
              >
                Sign In
              </Button>
              <Box ml={1}>
                <Button
                  color="inherit"
                  to="/signup"
                  component={ReactRouterLink}
                  className={clsx(classes.authBtnRoot, classes.rainbowBg)}
                >
                  Sign Up
                </Button>
              </Box>
            </Box>
          </Hidden>
          <Hidden mdUp>
            <IconButton
              edge="start"
              color="inherit"
              aria-label="menu"
              classes={{ root: classes.iconBtnRoot }}
              onClick={handleMenuClick}
            >
              <FontAwesomeIcon icon={faBars} />
            </IconButton>
          </Hidden>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Topbar;
