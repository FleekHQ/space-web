import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import Typography from '@ui/Typography';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import useStyles from './styles';

const MessageBox = (props) => {
  const {
    type,
    icon,
    title,
    bgColor,
    iconSize,
    children,
    className,
  } = props;

  const classes = useStyles({ type, bgColor, iconSize });

  return (
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
  );
};

MessageBox.defaultProps = {
  type: null,
  icon: null,
  title: null,
  iconSize: 14,
  bgColor: null,
  children: null,
  className: null,
};

MessageBox.propTypes = {
  title: PropTypes.node,
  children: PropTypes.node,
  icon: PropTypes.elementType,
  className: PropTypes.string,
  iconSize: PropTypes.number,
  bgColor: PropTypes.oneOf(['primary', 'secondary']),
  type: PropTypes.oneOf(['info', 'danger', 'upgrade', 'shopping']),
};

export default MessageBox;
