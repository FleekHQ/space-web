import React from 'react';
import PropTypes from 'prop-types';

import useStyles from './styles';

const Divider = ({
  viewMode,
}) => {
  const classes = useStyles({ viewMode });

  return <div className={classes.root} />;
};

Divider.propTypes = {
  viewMode: PropTypes.string.isRequired,
};

export default Divider;
