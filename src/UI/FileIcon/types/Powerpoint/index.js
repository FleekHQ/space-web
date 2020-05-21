import React from 'react';
import classnames from 'classnames';
import PresentationIcon from '../../svgs/Presentation.svg';
import useStyles from '../../styles';


const Powerpoint = () => {
  const classes = useStyles();

  return (
    <div className={classnames(classes.container)}>
      <img src={PresentationIcon} alt="presentation-icon" className={classes.iconImg}/>
    </div>
  )};

export default Powerpoint;
