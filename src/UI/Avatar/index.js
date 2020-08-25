import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';

import Avatar from '@material-ui/core/Avatar';

import useStyles from './styles';

const UIAvatar = ({
  size,
  imgUrl,
  active,
  username,
  children,
  className,
}) => {
  const classes = useStyles({ size, active, username });

  return (
    <Avatar
      src={imgUrl}
      alt={username}
      className={classNames(classes.root, className)}
    >
      {children}
    </Avatar>
  );
};

UIAvatar.defaultProps = {
  size: 38,
  imgUrl: null,
  active: false,
  children: null,
  className: '',
  username: ' ',
};

UIAvatar.propTypes = {
  size: PropTypes.number,
  active: PropTypes.bool,
  imgUrl: PropTypes.string,
  children: PropTypes.node,
  className: PropTypes.string,
  username: PropTypes.string,
};

export default UIAvatar;
