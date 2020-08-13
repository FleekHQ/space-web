import React from 'react';
import PropTypes from 'prop-types';

import Typography from '@material-ui/core/Typography';

import useStyles from './styles';

const Requirement = ({
  isCorrect,
  requirement,
}) => {
  const classes = useStyles({ isCorrect });

  return (
    <div className={classes.rootRequirement}>
      <div className={classes.circle} />
      <Typography variant="body2" color="inherit">{requirement}</Typography>
    </div>
  );
};

Requirement.propTypes = {
  isCorrect: PropTypes.bool.isRequired,
  requirement: PropTypes.string.isRequired,
};

export default Requirement;
