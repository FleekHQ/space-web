import React from 'react';
import { Link } from 'react-router-dom';
import IconsNavigation from '@ui/IconsNavigation';
import Typography from '@ui/Typography';
import Avatar from '@ui/Avatar';
import CreateNewButton from '../CreateNewButton';
import TeamSelector from '../TeamSelector';
import useStyles from './styles';
import { useNavigations } from './hooks';

const accountsList = [{
  id: '2',
  name: 'Team Name',
  membersNumber: 2,
  photoUrl: '',
}];

const activeLinkProps = {
  weight: 'medium',
  color: 'textSecondary',
};

const Sidebar = () => {
  const classes = useStyles();
  const { generalNav, specificNav } = useNavigations();

  return (
    <div className={classes.root}>
      <div className={classes.trafficLightsSpot}></div>
      <TeamSelector accountsList={accountsList} selectedAccountId="2" />
      <div className={classes.navWrapper}>
        <div className={`${classes.navColumn} ${classes.generalNav}`}>
          <IconsNavigation options={generalNav} />
          <div className={classes.pullDown}>
            <Avatar />
          </div>
        </div>
        <div className={`${classes.navColumn} ${classes.specificNavWrapper}`}>
          <Typography
            weight="medium"
            variant="h6"
            className={classes.specificNavTitle}
          >
            {specificNav.title}
          </Typography>
          {specificNav.list.map((navLink) => (
            <Link
              key={navLink.key}
              to={navLink.to}
              className={classes.specificNavLink}
            >
              <Typography
                color="secondary"
                variant="body1"
                {...navLink.active && activeLinkProps}
              >
                {navLink.text}
              </Typography>
            </Link>
          ))}
          <div className={classes.pullDown}>
            <CreateNewButton />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
