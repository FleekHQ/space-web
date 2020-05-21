import React from 'react';
import classnames from 'classnames';
import VideoIcon from '../../svgs/Video.svg';
import useStyles from '../../styles';


const Video = () => {
  const classes = useStyles();

  return (
    <div className={classnames(classes.container)}>
      <img src={VideoIcon} alt="video-icon" className={classes.iconImg}/>
    </div>
  )};

export default Video;
