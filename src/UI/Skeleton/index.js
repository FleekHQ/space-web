import React from 'react';
import Skeleton from '@material-ui/lab/Skeleton';

const SkeletonLoading = (props) => (
  <Skeleton
    animation="wave"
    variant="rect"
    // eslint-disable-next-line react/jsx-props-no-spreading
    {...props}
  />
);

export default SkeletonLoading;
