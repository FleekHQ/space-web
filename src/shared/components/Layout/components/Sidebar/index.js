import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Divider from '@material-ui/core/Divider';
import Typography from '@ui/Typography';
import Avatar from '@ui/Avatar';
// import CreateNewButton from '../CreateNewButton';
// import useItems from '../CreateNewMenu/hooks/useItems';
import Account from '../Account';
import useStyles from './styles';
import { useNavigations } from './hooks';

const activeLinkProps = {
  weight: 'medium',
  color: 'textSecondary',
};

const isMac = process.platform === 'darwin';

const Sidebar = () => {
  // const items = useItems();
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
            imgUrl={user.imgURL}
            username={user.username}
          />
        </div>
        <div className={classes.rightPanel}>
          <div className={classes.userContent}>
            <Account
              account={{
                id: user.username,
                name: user.username,
                membersNumber: 0,
              }}
            />
            {/* TODO: replace this with the right add button */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
              }}
            >
              <div
                style={{
                  height: 30,
                  width: 30,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                +
              </div>
              {/* <CreateNewButton items={items} /> */}
            </div>
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
