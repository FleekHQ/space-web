import React from 'react';
import classnames from 'classnames';
import ZIPIcon from '../../svgs/ZIP.svg';
import useStyles from '../../styles';

const Zip = () => {
  const classes = useStyles();

  return (
    <div className={classnames(classes.container)}>
      <img src={ZIPIcon} alt="zip-icon" className={classes.iconImg}/>
    </div>
  )};

export default Zip;