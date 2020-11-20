import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

import Divider from '@material-ui/core/Divider';

import Avatar from '@ui/Avatar';
import Typography from '@ui/Typography';
import { getShortAddress } from '@utils';

import Account from '../Account';
import CreateNewButton from '../CreateNewButton';

import useStyles from './styles';
import { useNavigations } from './hooks';

const activeLinkProps = {
  weight: 'medium',
  color: 'textSecondary',
};

const isMac = process.platform === 'darwin';

const Sidebar = () => {
  const user = useSelector((state) => state.user);
  const classes = useStyles({ user });
  const { specificNav } = useNavigations();

  return (
    <div className={classes.rootSidebar}>
      {isMac && <div className={classes.trafficLightsSpot} />}
      <div className={classes.contentSidebar}>
        <div className={classes.leftPanel}>
          <Avatar
            active
            size={24}
            imgUrl={user.avatarUrl}
            username={user.username}
          />
        </div>
        <div className={classes.rightPanel}>
          <div className={classes.userContent}>
            <Account
              account={{
                membersNumber: 0,
                id: user.username,
                name: user.username || getShortAddress(user.address),
              }}
            />
            <CreateNewButton />
          </div>
          <Divider classes={{ root: classes.rootDivider }} />
          <ul className={classes.navMenu}>
            {specificNav.list.map((navLink) => (
              <li key={navLink.key}>
                <Link
                  to={navLink.to}
                  className={classes.specificNavLink}
                >
                  <Typography
                    color="secondary"
                    variant="body1"
                    // eslint-disable-next-line react/jsx-props-no-spreading
                    {...navLink.active && activeLinkProps}
                  >
                    {navLink.text}
                  </Typography>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
