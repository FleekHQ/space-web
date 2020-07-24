import React from 'react';
import PropTypes from 'prop-types';

import Typography from '@ui/Typography';

import useStyles from './styles';

const Empty = ({
  title,
  message,
}) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Typography variant="h6" className={classes.title}>
        {title}
      </Typography>
      <Typography variant="body2" color="secondary">
        {message}
      </Typography>
    </div>
  );
};

Empty.propTypes = {
  title: PropTypes.string.isRequired,
  message: PropTypes.string.isRequired,
};

export default Empty;
