import React from 'react';
import Typography from '@ui/Typography';
import useStyles from './styles';

const SharePanel = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Typography variant="h6">
        SHARE PANEL
      </Typography>
    </div>
  );
};

export default SharePanel;
