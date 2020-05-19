import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classnames from 'classnames';
import { faPresentation } from '@fortawesome/pro-solid-svg-icons/faPresentation';
import useStyles from '../../styles';


const Powerpoint = () => {
  const classes = useStyles();

  return (
    <div className={classnames(classes.container, classes.powerpoint)}>
      <FontAwesomeIcon
        icon={faPresentation}
      />
    </div>
  )};

export default Powerpoint;
