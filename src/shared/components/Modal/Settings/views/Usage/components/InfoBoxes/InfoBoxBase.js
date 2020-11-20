import React from 'react';
import PropTypes from 'prop-types';
import Typography from '@ui/Typography';
import Button from '@material-ui/core/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import useStyles from './styles';

const InfoBoxBase = ({
  warning,
  icon,
  title,
  message,
  buttonText,
  onClick,
  children,
}) => {
  const classes = useStyles({ warning });

  return (
    <div className={classes.root}>
      <FontAwesomeIcon icon={icon} className={classes.circleArrowIcon} />
      <div>
        <Typography variant="body2" weight="medium" color="inherit">{title}</Typography>
        <Typography variant="body2" className={classes.message}>{message}</Typography>
        <div className={classes.buttonsList}>
          <Button variant="contained" onClick={onClick}>
            <Typography variant="body2" color="inherit">
              {buttonText}
            </Typography>
          </Button>
          {children}
        </div>
      </div>
    </div>
  );
};

InfoBoxBase.defaultProps = {
  warning: false,
  children: null,
};

InfoBoxBase.propTypes = {
  icon: PropTypes.shape({}).isRequired,
  title: PropTypes.string.isRequired,
  message: PropTypes.string.isRequired,
  buttonText: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  children: PropTypes.node,
  warning: PropTypes.bool,
};

export default InfoBoxBase;
