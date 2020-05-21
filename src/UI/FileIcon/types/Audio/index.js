import React from 'react';
import classnames from 'classnames';
import AudioIcon from '../../svgs/Audio.svg';
import useStyles from '../../styles';

const Audio = () => {
  const classes = useStyles();

  return (
    <div className={classnames(classes.container)}>
      <img src={AudioIcon} alt="audio-icon" className={classes.iconImg}/>
    </div>
  )};

export default Audio;
