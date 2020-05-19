import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classnames from 'classnames';
import { faVolume } from '@fortawesome/pro-regular-svg-icons/faVolume';
import useStyles from '../../styles';

const Audio = () => {
  const classes = useStyles();

  return (
    <div className={classnames(classes.container, classes.audio)}>
      <FontAwesomeIcon
        icon={faVolume}
      />
    </div>
  )};

export default Audio;
