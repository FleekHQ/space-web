import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Typography from '@ui/Typography';
import Avatar from '@ui/Avatar';
import CreateNewButton from '../CreateNewButton';
import useItems from '../CreateNewMenu/hooks/useItems';
import TeamSelector from '../TeamSelector';
import useStyles from './styles';
import { useNavigations } from './hooks';

const activeLinkProps = {
  weight: 'medium',
  color: 'textSecondary',
};

const isMac = process.platform === 'darwin';

const Sidebar = () => {
  const items = useItems();
  const user = useSelector((state) => state.user);
  const classes = useStyles({ user });
  const { specificNav } = useNavigations();

  return (
    <div className={classes.rootSidebar}>
      {isMac && <div className={classes.trafficLightsSpot} />}
      <div className={classes.sidebarContent}>
        <div className={classes.accounts}>
          <Avatar
            active
            size={24}
            imgUrl={user.imgURL}
            username={user.username}
          />
        </div>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <div
            style={{
              display: 'flex',
              flexDirection: 'row',
            }}
          >
            <TeamSelector
              accountsList={[{
                id: user.username,
                name: user.username,
                membersNumber: 0,
              }]}
              selectedAccountId={user.username}
            />
            <CreateNewButton items={items} />
          </div>
          {specificNav.list.map((navLink) => (
            <Link
              key={navLink.key}
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
          ))}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
