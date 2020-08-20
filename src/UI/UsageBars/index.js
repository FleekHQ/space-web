import React from 'react';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import classnames from 'classnames';
import LegendItem from './components/LegendItem';
import ChartBarItem from './components/ChartBarItem';
import useStyles from './styles';

/* eslint-disable react/jsx-props-no-spreading */

const UsageBars = ({
  disabled,
  title,
  using,
  borderColor,
  items,
}) => {
  const classes = useStyles({ borderColor });

  const getBar = () => {
    if (disabled) {
      return (
        <div className={classnames(classes.disabled, classes.chartBar)} />
      );
    }
    return (
      <div className={classes.chartBar}>
        {items.map((item, index) => (
          <ChartBarItem
            {...item}
            borderColor={borderColor}
            isFirst={index === 0}
            isLast={index === items.length - 1}
          />
        ))}
      </div>
    );
  };

  return (
    <>
      <div className={classes.titleContainer}>
        <Typography className={classes.titleText}>
          {title}
        </Typography>
        <Typography className={classes.usingText}>
          {using}
        </Typography>
      </div>
      {getBar()}
      <div className={classes.legendContainer}>
        {items.map((item) => (
          <LegendItem {...item} borderColor={borderColor} disabled={disabled} />
        ))}
      </div>
    </>
  );
};

UsageBars.defaultProps = {
  using: '',
  title: '',
  disabled: false,
  items: [],
};

UsageBars.propTypes = {
  title: PropTypes.string,
  using: PropTypes.node,
  borderColor: PropTypes.string.isRequired,
  items: PropTypes.arrayOf(PropTypes.shape({
    text: PropTypes.string.isRequired,
    width: PropTypes.number.isRequired,
    color: PropTypes.string.isRequired,
  })),
  disabled: PropTypes.bool,
};

export default UsageBars;
