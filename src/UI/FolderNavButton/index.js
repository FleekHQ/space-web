import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft  } from '@fortawesome/pro-regular-svg-icons/faArrowLeft';
import Button from '@material-ui/core/Button';
import useStyles from './styles';

const FolderNavButton = ({ direction, className, ...restProps }) => {
  const classes = useStyles();

  return (
    <Button
      className={classnames(classes.root, className)}
      disableRipple
      {...restProps}
    >
      <FontAwesomeIcon
        icon={faArrowLeft}
        flip={direction === 'forward' ? 'horizontal' : undefined}
        className={classnames(classes.icon, {
          [classes.disabledIcon]: restProps.disabled,
        })}
      />
    </Button>
  );
};

FolderNavButton.defaultProps = {
  className: undefined,
};

FolderNavButton.propTypes = {
  direction: PropTypes.oneOf(['back', 'forward']).isRequired,
  className: PropTypes.string,
};

export default FolderNavButton;
