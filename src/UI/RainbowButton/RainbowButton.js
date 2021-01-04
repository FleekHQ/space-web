import React from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import classnames from 'classnames';

import useStyles from './styles';

/* eslint-disable react/jsx-props-no-spreading */
const RainbowButton = (props) => {
  const { className, ...buttonProps } = props;
  const classes = useStyles();

  return (
    <Button
      className={classnames(
        classes.root,
        className,
      )}
      variant="contained"
      {...buttonProps}
    />
  );
};

RainbowButton.defaultProps = {
  className: null,
};

RainbowButton.propTypes = {
  className: PropTypes.string,
};

export default RainbowButton;
