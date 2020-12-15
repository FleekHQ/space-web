import React from 'react';
import ButtonBase from '@material-ui/core/ButtonBase';
import classnames from 'classnames';
import { faEllipsisH } from '@fortawesome/pro-solid-svg-icons/faEllipsisH';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import useStyles from './styles';

const ThreeDotsButton = () => {
  const classes = useStyles();
  const isActive = true;
  return (
    <>
      <ButtonBase
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
    </>
  );
};

export default ThreeDotsButton;
