import React from 'react';
import IconFA from '@ui/IconFA';
import classnames from 'classnames';
import useStyles from '../../styles';


const Default = () => {
  const classes = useStyles();

  return (
    <div className={classnames(classes.container, classes.default)}>
      <IconFA
        icon={['far', 'ghost']}
        fontSize="inherit"
        iconColor="inherit"
      />
    </div>
  )};

export default Default;
