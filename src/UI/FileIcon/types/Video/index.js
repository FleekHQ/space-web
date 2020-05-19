import React from 'react';
import classnames from 'classnames';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faVideo } from '@fortawesome/pro-regular-svg-icons/faVideo';
import useStyles from '../../styles';


const Video = () => {
  const classes = useStyles();

  return (
    <div className={classnames(classes.container, classes.video)}>
      <FontAwesomeIcon
        icon={faVideo}
      />
    </div>
  )};

export default Video;
