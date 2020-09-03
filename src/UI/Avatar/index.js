import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';

import Avatar from '@material-ui/core/Avatar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/pro-light-svg-icons/faUser';
import { faSpinner } from '@fortawesome/pro-regular-svg-icons/faSpinner';

import useStyles from './styles';

const UIAvatar = ({
  size,
  imgUrl,
  active,
  username,
  children,
  isLoading,
  className,
}) => {
  const classes = useStyles({ size, active, username });

  const content = (() => {
    if (isLoading) {
      return <FontAwesomeIcon spin className={classes.icon} icon={faSpinner} />;
    }

    if (children) {
      return children;
    }

    return <FontAwesomeIcon width="100%" height="100%" className={classes.icon} icon={faUser} />;
  })();

  return (
    <Avatar
      alt={username}
      src={isLoading ? null : imgUrl}
      className={classNames(classes.root, className)}
    >
      {content}
    </Avatar>
  );
};

UIAvatar.defaultProps = {
  size: 38,
  imgUrl: null,
  active: false,
  children: null,
  className: '',
  username: '',
  isLoading: false,
};

UIAvatar.propTypes = {
  size: PropTypes.number,
  active: PropTypes.bool,
  imgUrl: PropTypes.string,
  children: PropTypes.node,
  isLoading: PropTypes.bool,
  username: PropTypes.string,
  className: PropTypes.string,
};

export default UIAvatar;
