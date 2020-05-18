import React from 'react';
import IconFA from '@ui/IconFA';
import classnames from 'classnames';
import useStyles from '../../styles';


const Word = () => {
  const classes = useStyles();

  return (
    <div className={classnames(classes.container, classes.word)}>
      <IconFA
        icon={['fas', 'align-left']}
        fontSize="inherit"
        iconColor="inherit"
      />
    </div>
  )};

export default Word;
