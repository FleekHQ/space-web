import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classnames from 'classnames';
import { faGhost } from '@fortawesome/pro-regular-svg-icons/faGhost';
import useStyles from '../../styles';


const Default = () => {
  const classes = useStyles();

  return (
    <div className={classnames(classes.container, classes.default)}>
      <FontAwesomeIcon
        icon={faGhost}
      />
    </div>
  )};

export default Default;
