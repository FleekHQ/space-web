import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import Typography from '@material-ui/core/Typography';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLaptop } from '@fortawesome/pro-regular-svg-icons/faLaptop';
import { faPlanetRinged } from '@fortawesome/pro-regular-svg-icons/faPlanetRinged';
import { faExclamationCircle } from '@fortawesome/pro-solid-svg-icons/faExclamationCircle';

import useStyles from './styles';

const StorageInfoBox = ({
  i18n,
  localUsage,
  spaceUsage,
  spaceLimitReached,
}) => {
  const classes = useStyles();

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
        <div>
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
};

export default StorageInfoBox;
