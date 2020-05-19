import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classnames from 'classnames';
import { faPlanetRinged } from '@fortawesome/pro-regular-svg-icons/faPlanetRinged';
import useStyles from '../../styles';


const Default = () => {
  const classes = useStyles();

  return (
    <div className={classnames(classes.container, classes.default)}>
      <FontAwesomeIcon
        icon={faPlanetRinged}
      />
    </div>
  )};

export default Default;
