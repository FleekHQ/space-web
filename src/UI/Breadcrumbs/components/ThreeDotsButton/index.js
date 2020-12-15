import React from 'react';
import PropTypes from 'prop-types';
import ButtonBase from '@material-ui/core/ButtonBase';
import classnames from 'classnames';
import { faEllipsisH } from '@fortawesome/pro-solid-svg-icons/faEllipsisH';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import useStyles from './styles';

const ThreeDotsButton = ({
  isActive,
  onClick,
}) => {
  const classes = useStyles();

  return (
    <ButtonBase
      onClick={onClick}
      className={classnames(classes.button, {
        [classes.buttonActive]: isActive,
        [classes.buttonInactive]: !isActive,
      })}
    >
      <FontAwesomeIcon
        className={classnames(classes.icon, {
          [classes.iconActive]: isActive,
          [classes.iconInactive]: !isActive,
        })}
        icon={faEllipsisH}
      />
    </ButtonBase>
  );
};

ThreeDotsButton.defaultProps = {
  isActive: false,
  onClick: () => {},
};

ThreeDotsButton.propTypes = {
  onClick: PropTypes.func,
  isActive: PropTypes.bool,
};

export default ThreeDotsButton;
