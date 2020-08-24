import React from 'react';
import PropTypes from 'prop-types';
import useStyles from './styles';

const ChartBarItem = ({
  width,
  color,
  borderColor,
  isFirst,
  isLast,
}) => {
  const classes = useStyles({
    width,
    color,
    borderColor,
    isFirst,
    isLast,
  });

  return (
    <div className={classes.chartBar} />
  );
};

ChartBarItem.propTypes = {
  width: PropTypes.number.isRequired,
  color: PropTypes.string.isRequired,
  borderColor: PropTypes.string.isRequired,
  isFirst: PropTypes.bool.isRequired,
  isLast: PropTypes.bool.isRequired,
};

export default ChartBarItem;
