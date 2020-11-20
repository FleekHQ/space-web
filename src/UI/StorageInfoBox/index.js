import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import Typography from '@material-ui/core/Typography';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLaptop } from '@fortawesome/pro-regular-svg-icons/faLaptop';
import { faPlanetRinged } from '@fortawesome/pro-regular-svg-icons/faPlanetRinged';
import { faExclamationCircle } from '@fortawesome/pro-solid-svg-icons/faExclamationCircle';
import Popover from '@material-ui/core/Popover';
import UpgradeTooltip from '../Table/components/UpgradeTooltip';

import useStyles from './styles';

const StorageInfoBox = ({
  i18n,
  localUsage,
  spaceUsage,
  spaceLimitReached,
  backupTooltipProps,
}) => {
  const classes = useStyles();

  const [anchorEl, setAnchorEl] = React.useState(null);

  const handlePopoverOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl) && spaceLimitReached;

  return (
    <div className={classes.container}>
      <Typography className={classes.title}>
        {i18n.title}
      </Typography>
      <div className={classes.usageLine}>
        <div className={classes.labelContainer}>
          <div className={classes.storageIconContainer}>
            <FontAwesomeIcon
              icon={faLaptop}
              className={classes.localStorage}
            />
          </div>
          <Typography className={classes.text}>
            {i18n.local}
          </Typography>
        </div>
        <Typography className={classes.text}>
          {localUsage}
        </Typography>
      </div>
      <div className={classes.usageLine}>
        <div className={classes.labelContainer}>
          <div className={classes.storageIconContainer}>
            <FontAwesomeIcon
              icon={faPlanetRinged}
              className={classes.spaceStorage}
            />
          </div>
          <Typography className={classes.text}>
            {i18n.space}
          </Typography>
        </div>
        <div
          aria-owns={open ? 'mouse-over-popover' : undefined}
          aria-haspopup="true"
          onMouseEnter={handlePopoverOpen}
        >
          {spaceLimitReached && (
            <FontAwesomeIcon icon={faExclamationCircle} className={classes.warningIcon} />
          )}
          <Typography
            className={classnames(classes.text, {
              [classes.warningText]: spaceLimitReached,
            })}
          >
            {spaceUsage}
          </Typography>
        </div>
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
          // eslint-disable-next-line react/jsx-props-no-spreading
          {...backupTooltipProps}
        />
      </Popover>
    </div>
  );
};

StorageInfoBox.defaultProps = {
  spaceLimitReached: false,
  localUsage: '',
  spaceUsage: '',
};

StorageInfoBox.propTypes = {
  i18n: PropTypes.shape({
    title: PropTypes.string.isRequired,
    local: PropTypes.string.isRequired,
    space: PropTypes.string.isRequired,
  }).isRequired,
  localUsage: PropTypes.string,
  spaceUsage: PropTypes.string,
  spaceLimitReached: PropTypes.bool,
  backupTooltipProps: PropTypes.shape({
    i18n: PropTypes.shape({
      warning: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
      button: PropTypes.string.isRequired,
    }).isRequired,
    onClick: PropTypes.func.isRequired,
  }).isRequired,
};

export default StorageInfoBox;
