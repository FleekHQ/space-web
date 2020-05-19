import React from 'react';
import classnames from 'classnames';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAlignLeft } from '@fortawesome/pro-solid-svg-icons/faAlignLeft';
import useStyles from '../../styles';


const Word = () => {
  const classes = useStyles();

  return (
    <div className={classnames(classes.container, classes.word)}>
      <FontAwesomeIcon
        icon={faAlignLeft}
      />
    </div>
  )};

export default Word;
