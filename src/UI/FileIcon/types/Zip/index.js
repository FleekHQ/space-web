import React from 'react';
import classnames from 'classnames';
import Typography from '@material-ui/core/Typography';
import useStyles from '../../styles';

const Zip = () => {
  const classes = useStyles();

  return (
    <div className={classnames(classes.container, classes.zip)}>
      <Typography className={classes.text}>
        ZIP
      </Typography>
    </div>
  )};

export default Zip;