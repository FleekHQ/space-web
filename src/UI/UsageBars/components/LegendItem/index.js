import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import Typography from '@material-ui/core/Typography';
import useStyles from './styles';

const LegendItem = ({
  text,
  width,
  color,
  disabled,
  borderColor,
}) => {
  const classes = useStyles({ width, color, borderColor });

  return (
    <div className={classes.legendItem}>
      <div className={classnames(classes.box, {
        [classes.boxActive]: !disabled,
        [classes.disabled]: disabled,
      })}
      />
      <Typography className={classes.barText}>
        {text}
      </Typography>
    </div>
  );
};

LegendItem.propTypes = {
  disabled: PropTypes.bool.isRequired,
  text: PropTypes.string.isRequired,
  width: PropTypes.number.isRequired,
  color: PropTypes.string.isRequired,
  borderColor: PropTypes.string.isRequired,
};

export default LegendItem;
