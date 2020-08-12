import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Button from '@material-ui/core/Button';
import Popover from '@material-ui/core/Popover';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCog } from '@fortawesome/pro-light-svg-icons/faCog';
import { faSignOut } from '@fortawesome/pro-light-svg-icons/faSignOut';
import { faAngleDown } from '@fortawesome/pro-light-svg-icons/faAngleDown';
import { faQuestionCircle } from '@fortawesome/pro-light-svg-icons/faQuestionCircle';

import useStyles, { userAccountMenu, useUserBtnStyles } from './styles';

const Account = ({ account }) => {
  const { t } = useTranslation();
  const [anchorEl, setAnchorEl] = React.useState(null);

  const classes = useStyles();
  const listClasses = userAccountMenu();
  const btnClasses = useUserBtnStyles();

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'account-menu' : undefined;

  return (
    <div className={classes.root}>
      <Button
        disableRipple
        disableFocusRipple
        color="inherit"
        classes={btnClasses}
        aria-describedby={id}
        onClick={handleClick}
        endIcon={<FontAwesomeIcon icon={faAngleDown} />}
      >
        {account.name}
      </Button>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        classes={{
          paper: classes.rootPopover,
        }}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
      >
        <List classes={listClasses}>
          <ListItem>
            <FontAwesomeIcon icon={faCog} />
            <Typography color="inherit">
              {t('account.menu.settings')}
            </Typography>
          </ListItem>
          <ListItem>
            <FontAwesomeIcon icon={faQuestionCircle} />
            <Typography color="inherit">
              {t('account.menu.help')}
            </Typography>
          </ListItem>
          <Divider classes={{ root: classes.rootDivider }} />
          <ListItem>
            <FontAwesomeIcon icon={faSignOut} />
            <Typography color="inherit">
              {t('account.menu.signout')}
            </Typography>
          </ListItem>
        </List>
      </Popover>
      <Typography variant="body2" color="secondary">
        {t('account.personal')}
      </Typography>
    </div>
  );
};

Account.propTypes = {
  account: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    membersNumber: PropTypes.number.isRequired,
    photoUrl: PropTypes.string,
  }).isRequired,
};

export default Account;
