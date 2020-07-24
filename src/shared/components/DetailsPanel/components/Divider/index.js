import React from 'react';

import useStyles from './styles';

const Divider = () => {
  const classes = useStyles();

  return <div className={classes.root} />;
};

export default Divider;
