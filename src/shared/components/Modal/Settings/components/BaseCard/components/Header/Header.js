import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import useStyles from './styles';

/* eslint-disable react/jsx-props-no-spreading */
const Header = ({ children, className, ...restProps }) => {
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

Header.defaultProps = {
  children: null,
  className: null,
};

Header.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
};

export default Header;
