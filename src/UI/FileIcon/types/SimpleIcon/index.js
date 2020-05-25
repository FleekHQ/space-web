import React from 'react';
import PropTypes from 'prop-types';
import useStyles from '../../styles';

const Icon = ({
  iconSrc,
}) => {
  const classes = useStyles();

  return (
    <img src={iconSrc} alt="icon" className={classes.iconImg}/>
  );
};

Icon.propTypes = {
  iconSrc: PropTypes.string.isRequired,
};

export default Icon;
