import React from 'react';
import classnames from 'classnames';
import Typography from '@material-ui/core/Typography';
import useStyles from '../../styles';

const PDF = () => {
  const classes = useStyles();

  return (
    <div className={classnames(classes.container, classes.pdf)}>
      <Typography className={classes.text}>
        PDF
      </Typography>
    </div>
  )};

export default PDF;