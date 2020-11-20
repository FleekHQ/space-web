import React from 'react';
import PropTypes from 'prop-types';
import { faStar } from '@fortawesome/pro-regular-svg-icons/faStar';
import { faStar as faStarSolid } from '@fortawesome/pro-solid-svg-icons/faStar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import ButtonBase from '@material-ui/core/ButtonBase';
import classnames from 'classnames';
import useStyles from './styles';

const StarCheckbox = (props) => {
  const {
    onClick,
    active,
  } = props;

  const classes = useStyles(props);

  return (
    <ButtonBase
      className={classes.button}
      onClick={onClick}
    >
      <FontAwesomeIcon
        className={classnames(classes.fill, {
          [classes.inactive]: !active,
        })}
        icon={faStarSolid}
      />
      <FontAwesomeIcon
        className={classes.outline}
        icon={faStar}
      />
    </ButtonBase>
  );
};

StarCheckbox.propTypes = {
  onClick: PropTypes.func.isRequired,
  active: PropTypes.bool.isRequired,
};

export default StarCheckbox;
