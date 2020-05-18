import React from 'react';
import IconFA from '@ui/IconFA';
import classnames from 'classnames';
import useStyles from '../../styles';


const Audio = () => {
  const classes = useStyles();

  return (
    <div className={classnames(classes.container, classes.audio)}>
      <IconFA
        icon={['far', 'volume']}
        fontSize="inherit"
        iconColor="inherit"
      />
    </div>
  )};

export default Audio;
