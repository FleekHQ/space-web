import React from 'react';
import IconFA from '@ui/IconFA';
import classnames from 'classnames';
import useStyles from '../../styles';


const Powerpoint = () => {
  const classes = useStyles();

  return (
    <div className={classnames(classes.container, classes.powerpoint)}>
      <IconFA
        icon={['fas', 'presentation']}
        fontSize="inherit"
        iconColor="inherit"
      />
    </div>
  )};

export default Powerpoint;
