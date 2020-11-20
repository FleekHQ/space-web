import React from 'react';
import PropTypes from 'prop-types';
import Badge from '@material-ui/core/Badge';
import ButtonBase from '@material-ui/core/ButtonBase';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell } from '@fortawesome/pro-regular-svg-icons/faBell';
import classnames from 'classnames';

import useStyles from './styles';

/* eslint-disable react/jsx-props-no-spreading */
const NotificationButton = (props) => {
  const { badgeInvisible, highlighted, ...buttonProps } = props;
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
          className={classnames(classes.icon, {
            [classes.highlighted]: highlighted,
          })}
        />
      </Badge>
    </ButtonBase>
  );
};

NotificationButton.defaultProps = {
  badgeInvisible: false,
  highlighted: false,
};

NotificationButton.propTypes = {
  badgeInvisible: PropTypes.bool,
  highlighted: PropTypes.bool,
};

export default NotificationButton;
