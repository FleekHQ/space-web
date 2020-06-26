import React from 'react';

import useStyles from './styles';

const { PUBLIC_URL } = process.env;

const Splash = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <img
        src={`${PUBLIC_URL}/assets/images/space.svg`}
        alt="space logo"
      />
      <div className={classes.orbit}>
        <div className={classes.moon} />
      </div>
    </div>
  );
};

export default Splash;
