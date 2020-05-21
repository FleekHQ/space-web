import React from 'react';
import classnames from 'classnames';
import UnknownIcon from '../../svgs/Unknown.svg';
import useStyles from '../../styles';

const Default = () => {
  const classes = useStyles();

  return (
    <div className={classnames(classes.container)}>
      <img src={UnknownIcon} alt="default-icon" className={classes.iconImg}/>
    </div>
  )};

export default Default;
