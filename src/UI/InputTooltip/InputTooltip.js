import React from 'react';
import PropTypes from 'prop-types';
import Tooltip from '@material-ui/core/Tooltip';
import Typography from '@material-ui/core/Typography';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import helper from './helper';

import useStyles, { useCustomToolTipStyles } from './styles';

const InputTooltip = ({
  type,
  title,
  tooltip,
  bgColor,
  children,
  requirements,
}) => {
  const classes = useStyles({ type, bgColor });
  const tooltipClasses = useCustomToolTipStyles({ type, bgColor });

  return (
    <Tooltip
      classes={tooltipClasses}
      title={(
        <div className={classes.tooltipContent}>
          <div className={classes.title}>
            <FontAwesomeIcon icon={helper.getIconByType(type)} />
            <Typography variant="body2" color="inherit">{title}</Typography>
          </div>
          <div className={classes.requirementList}>
            {requirements}
          </div>
        </div>
      )}
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...tooltip}
    >
      {children}
    </Tooltip>
  );
};

InputTooltip.defaultProps = {
  title: '',
  type: 'info',
  bgColor: 'primary',
  requirements: [],
};

InputTooltip.propTypes = {
  title: PropTypes.string,
  requirements: PropTypes.node,
  type: PropTypes.oneOf(['info', 'danger']),
  bgColor: PropTypes.oneOf(['primary', 'secondary']),
  children: PropTypes.node.isRequired,
  tooltip: PropTypes.shape({
    open: PropTypes.bool,
  }).isRequired,
};

export default InputTooltip;
