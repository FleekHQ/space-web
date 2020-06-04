import React from 'react';
import PropTypes from 'prop-types';

import Avatar from '@material-ui/core/Avatar';

import useStyles from './styles';

const UIAvatar = ({
  size,
  imgUrl,
  username,
}) => {
  const classes = useStyles({ size, username });

  return (
    <Avatar
      src={imgUrl}
      alt={username}
      className={classes.root}
    >
      {username[0].toUpperCase()}
    </Avatar>
  );
};

UIAvatar.defaultProps = {
  size: 38,
  imgUrl: null,
};

UIAvatar.propTypes = {
  size: PropTypes.number,
  imgUrl: PropTypes.string,
  username: PropTypes.string.isRequired,
};

export default UIAvatar;
