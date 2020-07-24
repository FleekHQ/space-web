import React from 'react';
import PropTypes from 'prop-types';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsisH } from '@fortawesome/pro-regular-svg-icons/faEllipsisH';

import Avatar from '@ui/Avatar';

import useStyles from './styles';

const getAvatarSize = (objectsLength) => {
  let size = 124;

  if (objectsLength > 1 && objectsLength <= 4) {
    size = 58;
  }

  if (objectsLength > 4) {
    size = 39;
  }

  return size;
};

const AvatarHeader = ({ objects }) => {
  const size = getAvatarSize(objects.length);
  const classes = useStyles({ objectsLength: objects.length });

  return (
    <div className={classes.root}>
      <div className={classes.avatarList}>
        {
          objects.map((object) => (
            <Avatar
              size={size}
              key={object.username}
              username={object.username}
              // TODO: remove this.
              imgUrl={`${process.env.PUBLIC_URL}/assets/images/default_avatar.png`}
            />
          ))
        }
      </div>
      <br />
      <Typography variant="h6">
        <Box fontWeight={500}>
          {
            objects.length > 1 ? `${objects.length} Users` : objects[0].username
          }
        </Box>
      </Typography>
      <br />
      <Button fullWidth variant="outlined">
        <FontAwesomeIcon icon={faEllipsisH} />
      </Button>
    </div>
  );
};

AvatarHeader.propTypes = {
  objects: PropTypes.arrayOf(PropTypes.shape({
    username: PropTypes.string.isRequired,
  })).isRequired,
};

export default AvatarHeader;
