import React from 'react';
import Paper from '@material-ui/core/Paper';
import PropTypes from 'prop-types';
import { faExclamationCircle } from '@fortawesome/pro-solid-svg-icons/faExclamationCircle';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import useStyles from './styles';

const UpgradeTooltip = ({
  i18n,
  onClick,
  ...restProps
}) => {
  const classes = useStyles();

  /* eslint-disable react/jsx-props-no-spreading */
  return (
    <div
      className={classes.container}
      {...restProps}
    >
      <Paper
        className={classes.paper}
      >
        <div className={classes.warningContainer}>
          <FontAwesomeIcon icon={faExclamationCircle} className={classes.warningIcon} />
          <Typography
            className={classes.warningText}
          >
            {i18n.warning}
          </Typography>
        </div>
        <Typography
          className={classes.description}
        >
          {i18n.description}
        </Typography>
        <Button
          variant="contained"
          className={classes.button}
          onClick={onClick}
        >
          {i18n.button}
        </Button>
      </Paper>
    </div>
  );
};

UpgradeTooltip.defaultProps = {
  onClick: () => {},
};

UpgradeTooltip.propTypes = {
  i18n: PropTypes.shape({
    warning: PropTypes.string,
    description: PropTypes.string,
    button: PropTypes.string,
  }).isRequired,
  onClick: PropTypes.func,
};

export default UpgradeTooltip;
