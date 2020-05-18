import React from 'react';
import IconFA from '@ui/IconFA';
import classnames from 'classnames';
import useStyles from '../../styles';


const Video = () => {
  const classes = useStyles();

  return (
    <div className={classnames(classes.container, classes.video)}>
      <IconFA
        icon={['far', 'video']}
        fontSize="inherit"
        iconColor="inherit"
      />
    </div>
  )};

export default Video;
