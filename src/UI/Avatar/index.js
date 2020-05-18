import React from 'react';
import PropTypes from 'prop-types';

import useStyles from './styles';

const getContent = ({
  id,
  alt,
  imgUrl,
}) => {
  if (imgUrl) {
    return (
      <img src={imgUrl} alt={alt}/>
    );
  }

  return (
    <svg  data-jdenticon-value={id}/>
  );
};

const Avatar = ({
  id,
  alt,
  size,
  imgUrl,
}) => {
  const classes = useStyles({ size });
  const content = getContent({ id, alt, imgUrl });

  return (
    <div  className={classes.root} >
      {content}
    </div>
  );
};

Avatar.defaultProps = {
  alt: '',
  size: 38,
  imgUrl: null,
  id: 'default-id',
};

Avatar.propTypes = {
  id: PropTypes.string,
  alt: PropTypes.string,
  size: PropTypes.number,
  imgUrl: PropTypes.string,
};

export default Avatar;
