import React from 'react';
import PropTypes from 'prop-types';
import Typography from '@ui/Typography';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLaptop } from '@fortawesome/pro-regular-svg-icons/faLaptop';
import { faPlanetRinged } from '@fortawesome/pro-regular-svg-icons/faPlanetRinged';
import { faUserAstronaut } from '@fortawesome/pro-regular-svg-icons/faUserAstronaut';
import classnames from 'classnames';

import useStyles from './styles';

const IconsCell = ({
  localStorageActive,
  spaceStorageActive,
  sharedCount,
}) => {
  const classes = useStyles();

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
      <div className={classes.spaceStorageContainer}>
        <FontAwesomeIcon
          icon={faPlanetRinged}
          className={classnames(classes.spaceStorage, {
            [classes.inactive]: !spaceStorageActive,
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
    </div>
  );
};

IconsCell.defaultProps = {
  localStorageActive: false,
  spaceStorageActive: false,
  sharedCount: 0,
};

IconsCell.propTypes = {
  localStorageActive: PropTypes.bool,
  spaceStorageActive: PropTypes.bool,
  sharedCount: PropTypes.number,
};

export default IconsCell;
