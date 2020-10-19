import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import Typography from '@ui/Typography';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExclamationTriangle } from '@fortawesome/pro-regular-svg-icons/faExclamationTriangle';

import useStyles from './styles';

/* eslint-disable react/jsx-props-no-spreading */
const ErrorCard = (props) => {
  const { className, message, ...restProps } = props;
  const classes = useStyles();

  return (
    <div
      className={classnames(
        className,
        classes.root,
      )}
      {...restProps}
    >
      <FontAwesomeIcon
        className={classes.icon}
        icon={faExclamationTriangle}
      />
      <Typography variant="body2">
        {message}
      </Typography>
    </div>
  );
};

ErrorCard.defaultProps = {
  message: null,
  className: null,
};

ErrorCard.propTypes = {
  message: PropTypes.string,
  className: PropTypes.string,
};

export default ErrorCard;
