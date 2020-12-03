import React from 'react';
import Skeleton from '@material-ui/lab/Skeleton';
import useStyles from './styles';

const VARIANT = 'rect';
const ANIMATION = 'wave';

/* eslint-disable react/jsx-props-no-spreading */
const LoadingCell = (props) => {
  const classes = useStyles();

  return (
    <Skeleton
      height={24}
      variant={VARIANT}
      animation={ANIMATION}
      className={classes.cell}
      {...props}
    />
  );
};

export default LoadingCell;
