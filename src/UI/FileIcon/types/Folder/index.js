import React from 'react';
import classnames from 'classnames';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFolder  } from '@fortawesome/pro-solid-svg-icons/faFolder';
import useStyles from '../../styles';


const Folder = () => {
  const classes = useStyles();

  return (
    <div className={classnames(classes.container, classes.folder)}>
      <FontAwesomeIcon
        icon={faFolder}
      />
    </div>
  )};

export default Folder;
