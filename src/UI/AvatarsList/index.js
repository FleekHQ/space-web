import React from 'react';
import PropTypes from 'prop-types';
import Avatar from '../Avatar';
import Typography from '../Typography';
import useStyles from './styles';
import Tooltip from './components/Tooltip';

const AvatarsList = ({ usersList, size, maxVisible }) => {
  const avatarSize = size === 'normal' ? 23 : 18;
  const typographySize = size === 'normal' ? 'body1' : 'h6';
  const classes = useStyles({ avatarSize });
  const visibleAvatars = usersList.length > maxVisible ? maxVisible - 1 : maxVisible;

  return (
    <div className={classes.root}>
      {usersList.slice(0, visibleAvatars).map((user) => (
        <Tooltip usersList={[user]}>
          <Avatar
            key={user.address}
            imgUrl={user.imgUrl}
            username={user.username}
            size={avatarSize}
            className={classes.avatar}
          />
        </Tooltip>
      ))}
      {usersList.length === 1 && (
        <Typography variant={typographySize} weight="medium">
          {usersList[0].username}
        </Typography>
      )}
      {visibleAvatars === maxVisible - 1 && (
        <Tooltip usersList={usersList.slice(visibleAvatars)}>
          <Typography variant="body1" className={classes.hiddenNumber}>
            {`+${usersList.length - visibleAvatars}`}
          </Typography>
        </Tooltip>
      )}
    </div>
  );
};

AvatarsList.defaultProps = {
  size: 'small',
  maxVisible: 5,
};

AvatarsList.propTypes = {
  size: PropTypes.oneOf(['small', 'normal']),
  maxVisible: PropTypes.number,
  usersList: PropTypes.arrayOf(PropTypes.shape({
    imgUrl: PropTypes.string,
    username: PropTypes.string,
    address: PropTypes.string.isRequired,
    publicKey: PropTypes.string.isRequired,
    isOwner: PropTypes.bool.isRequired,
  })).isRequired,
};

export default AvatarsList;
