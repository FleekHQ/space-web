import React from 'react';
import PropTypes from 'prop-types';
import Badge from '@material-ui/core/Badge';
import ButtonBase from '@material-ui/core/ButtonBase';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell } from '@fortawesome/pro-regular-svg-icons/faBell';

import useStyles from './styles';

/* eslint-disable react/jsx-props-no-spreading */
const NotificationButton = (props) => {
  const { badgeInvisible, ...buttonProps } = props;
  const classes = useStyles();

  return (
    <ButtonBase {...buttonProps}>
      <Badge
        color="secondary"
        variant="dot"
        invisible={badgeInvisible}
        classes={{
          anchorOriginTopRightRectangle: classes.anchorOriginTopRightRectangle,
        }}
      >
        <FontAwesomeIcon
          icon={faBell}
          className={classes.icon}
        />
      </Badge>
    </ButtonBase>
  );
};

NotificationButton.defaultProps = {
  badgeInvisible: false,
};

NotificationButton.propTypes = {
  badgeInvisible: PropTypes.bool,
};

export default NotificationButton;
