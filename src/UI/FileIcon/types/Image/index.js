import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import useStyles from '../../styles';


const Image = ({ src }) => {
  const classes = useStyles();

  return (
    <div className={classnames(classes.container, classes.imageContainer)}>
      <img alt="img-preview" src={src} className={classes.image} />
    </div>
  );
};

Image.propTypes = {
  src: PropTypes.string.isRequired,
};

export default Image;
