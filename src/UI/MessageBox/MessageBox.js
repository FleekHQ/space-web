import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import Typography from '@ui/Typography';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import useStyles from './styles';

const MessageBox = (props) => {
  const {
    icon,
    title,
    bgColor,
    iconSize,
    children,
    className,
    isRainbow,
    iconColor,
  } = props;

  const classes = useStyles({
    bgColor,
    iconSize,
    isRainbow,
    iconColor,
  });

  return (
    <div
      className={classnames({
        [classes.accentWrapper]: isRainbow,
      })}
    >
      <div
        className={classnames(
          classes.root,
          className,
        )}
      >
        <div className={classes.titleContainer}>
          {
            icon && (
              <FontAwesomeIcon
                icon={icon}
                className={classes.icon}
              />
            )
          }
          {typeof title === 'string' ? (
            <Typography variant="body2" weight="bold">
              {title}
            </Typography>
          ) : title}
        </div>
        <div className={classes.content}>
          {children}
        </div>
      </div>
    </div>
  );
};

MessageBox.defaultProps = {
  icon: null,
  title: null,
  iconSize: 14,
  bgColor: null,
  children: null,
  className: null,
  iconColor: null,
  isRainbow: false,
};

MessageBox.propTypes = {
  title: PropTypes.node,
  children: PropTypes.node,
  icon: PropTypes.elementType,
  className: PropTypes.string,
  iconSize: PropTypes.number,
  isRainbow: PropTypes.bool,
  iconColor: PropTypes.string,
  bgColor: PropTypes.oneOf(['primary', 'secondary']),
};

export default MessageBox;
