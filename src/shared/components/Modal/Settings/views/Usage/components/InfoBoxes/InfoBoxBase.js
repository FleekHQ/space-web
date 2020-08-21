import React from 'react';
import PropTypes from 'prop-types';
import Typography from '@ui/Typography';
import Button from '@material-ui/core/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import useStyles from './styles';

const InfoBox = ({
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

InfoBox.defaultProps = {
  warning: false,
  children: null,
};

InfoBox.propTypes = {
  icon: PropTypes.shape({}).isRequired,
  title: PropTypes.string.isRequired,
  message: PropTypes.string.isRequired,
  buttonText: PropTypes.string.isRequired,
  onClick: PropTypes.string.isRequired,
  children: PropTypes.node,
  warning: PropTypes.bool,
};

export default InfoBox;
