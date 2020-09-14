import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import Typography from '@ui/Typography';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExclamationCircle } from '@fortawesome/pro-regular-svg-icons/faExclamationCircle';
import Button from '@material-ui/core/Button';
import { faSync } from '@fortawesome/pro-light-svg-icons/faSync';

import useStyles from './styles';

/* eslint-disable react/jsx-props-no-spreading */
const ErrorCard = (props) => {
  const {
    className,
    message,
    buttonText,
    buttonOnClick,
    ...restProps
  } = props;
  const classes = useStyles();

  return (
    <div
      className={classnames(
        className,
        classes.root,
      )}
      {...restProps}
    >
      <div className={classes.messageContainer}>
        <FontAwesomeIcon
          className={classes.icon}
          icon={faExclamationCircle}
        />
        <Typography variant="body2">
          {message}
        </Typography>
      </div>
      <Button
        variant="contained"
        onClick={buttonOnClick}
      >
        <FontAwesomeIcon
          icon={faSync}
          className={classes.buttonIcon}
        />
        <Typography className={classes.buttonText}>
          {buttonText}
        </Typography>
      </Button>
    </div>
  );
};

ErrorCard.defaultProps = {
  message: null,
  className: null,
  buttonText: '',
  buttonOnClick: () => {},
};

ErrorCard.propTypes = {
  message: PropTypes.string,
  className: PropTypes.string,
  buttonText: PropTypes.string,
  buttonOnClick: PropTypes.func,
};

export default ErrorCard;
