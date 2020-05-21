import React from 'react';
import classnames from 'classnames';
import DocIcon from '../../svgs/TextDoc.svg';
import useStyles from '../../styles';


const Word = () => {
  const classes = useStyles();

  return (
    <div className={classnames(classes.container)}>
      <img src={DocIcon} alt="doc-icon" className={classes.iconImg}/>
    </div>
  )};

export default Word;
