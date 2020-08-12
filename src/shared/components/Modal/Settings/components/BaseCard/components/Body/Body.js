import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import useStyles from './styles';

/* eslint-disable react/jsx-props-no-spreading */
const Body = ({ children, className, ...restProps }) => {
  const classes = useStyles();

  return (
    <div
      className={classnames(
        classes.root,
        className,
      )}
      {...restProps}
    >
      {children}
    </div>
  );
};

Body.defaultProps = {
  children: null,
  className: null,
};

Body.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
};

export default Body;
