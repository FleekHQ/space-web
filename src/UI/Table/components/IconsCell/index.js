import React from 'react';
import PropTypes from 'prop-types';
import Typography from '@ui/Typography';
import Popover from '@material-ui/core/Popover';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLaptop } from '@fortawesome/pro-regular-svg-icons/faLaptop';
import { faPlanetRinged } from '@fortawesome/pro-regular-svg-icons/faPlanetRinged';
import { faUserAstronaut } from '@fortawesome/pro-regular-svg-icons/faUserAstronaut';
import classnames from 'classnames';

import UpgradeTooltip from '../UpgradeTooltip';
import useStyles from './styles';

const IconsCell = ({
  localStorageActive,
  spaceStorageActive,
  sharedCount,
  storageLimitWarning,
  upgradeOnClick,
  i18n,
}) => {
  const classes = useStyles();

  const [anchorEl, setAnchorEl] = React.useState(null);

  const handlePopoverOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl) && storageLimitWarning;

  return (
    <div className={classes.container}>
      <div className={classes.localStorageContainer}>
        <FontAwesomeIcon
          icon={faLaptop}
          className={classnames(classes.localStorage, {
            [classes.inactive]: !localStorageActive,
          })}
        />
      </div>
      <div
        className={classes.spaceStorageContainer}
        aria-owns={open ? 'mouse-over-popover' : undefined}
        aria-haspopup="true"
        onMouseEnter={handlePopoverOpen}
      >
        <FontAwesomeIcon
          icon={faPlanetRinged}
          className={classnames(classes.spaceStorage, {
            [classes.inactive]: !spaceStorageActive && !storageLimitWarning,
            [classes.warning]: storageLimitWarning,
          })}
        />
      </div>
      <div className={classes.shareContainer}>
        <FontAwesomeIcon
          icon={faUserAstronaut}
          className={classnames(classes.sharedIcon, {
            [classes.inactive]: sharedCount === 0,
          })}
        />
        <Typography
          className={classnames(classes.sharedText, {
            [classes.inactive]: sharedCount === 0,
          })}
        >
          {sharedCount}
        </Typography>
      </div>
      <Popover
        classes={{
          paper: classes.paperPopover,
        }}
        open={open}
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 15,
          horizontal: 15 + 72,
        }}
        disableRestoreFocus
      >
        <UpgradeTooltip
          onMouseLeave={handlePopoverClose}
          i18n={i18n}
          onClick={upgradeOnClick}
        />
      </Popover>
    </div>
  );
};

IconsCell.defaultProps = {
  localStorageActive: false,
  spaceStorageActive: false,
  storageLimitWarning: false,
  sharedCount: 0,
  i18n: {},
  upgradeOnClick: () => {},
};

IconsCell.propTypes = {
  localStorageActive: PropTypes.bool,
  spaceStorageActive: PropTypes.bool,
  storageLimitWarning: PropTypes.bool,
  sharedCount: PropTypes.number,
  i18n: PropTypes.shape({
    warning: PropTypes.string,
    description: PropTypes.string,
    button: PropTypes.string,
  }),
  upgradeOnClick: PropTypes.func,
};

export default IconsCell;
