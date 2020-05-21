import React from 'react';
import classnames from 'classnames';
import PDFIcon from '../../svgs/PDF.svg';
import useStyles from '../../styles';

const PDF = () => {
  const classes = useStyles();

  return (
    <div className={classnames(classes.container)}>
      <img src={PDFIcon} alt="pdf-icon" className={classes.iconImg}/>
    </div>
  )};

export default PDF;