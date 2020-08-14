import React from 'react';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import classnames from 'classnames';
import useStyles from './styles';

const UsageBars = ({
  disabled,
  themeIndex,
  firstBarWidth,
  title,
  using,
  firstBarText,
  secondBarText,
}) => {
  const classes = useStyles({ themeIndex, firstBarWidth });

  const getBar = () => {
    if (disabled) {
      return (
        <div className={classnames(classes.disabled, classes.chartBar)} />
      );
    }
    return (
      <div className={classes.chartBar}>
        <div className={classnames(classes.chartBar, classes.bar1)} />
        <div className={classnames(classes.chartBar, classes.bar2)} />
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
        <div className={classes.legendItem}>
          <div className={classnames(classes.box, {
            [classes.firstBox]: !disabled,
            [classes.disabled]: disabled,
          })}
          />
          <Typography className={classes.barText}>
            {firstBarText}
          </Typography>
        </div>
        <div className={classes.legendItem}>
          <div className={classnames(classes.box, {
            [classes.secondBox]: !disabled,
            [classes.disabled]: disabled,
          })}
          />
          <Typography className={classes.barText}>
            {secondBarText}
          </Typography>
        </div>
      </div>
    </>
  );
};

UsageBars.defaultProps = {
  themeIndex: 0,
  firstBarWidth: 50,
  firstBarText: '',
  secondBarText: '',
  using: '',
  title: '',
  disabled: false,
};

UsageBars.propTypes = {
  themeIndex: PropTypes.number,
  firstBarWidth: PropTypes.number,
  title: PropTypes.string,
  using: PropTypes.node,
  firstBarText: PropTypes.string,
  secondBarText: PropTypes.string,
  disabled: PropTypes.bool,
};

export default UsageBars;
