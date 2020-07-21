import React from 'react';
import Button from '@material-ui/core/Button';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import useStyles from './styles';

const SendEmailFooter = (props) => {
  const {
    className,
    shareButtonText,
    onSendEmailClick,
    disabled,
  } = props;

  const classes = useStyles();

  return (
    <div className={classnames(className, classes.root)}>
      <Button
        variant="contained"
        onClick={onSendEmailClick}
        disabled={disabled}
      >
        {shareButtonText}
      </Button>
    </div>
  );
};

SendEmailFooter.propTypes = {
  shareButtonText: PropTypes.string.isRequired,
  className: PropTypes.string.isRequired,
  onSendEmailClick: PropTypes.func.isRequired,
  disabled: PropTypes.bool.isRequired,
};

export default SendEmailFooter;
