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
  } = props;

  const classes = useStyles();

  return (
    <div className={classnames(className, classes.root)}>
      <Button
        variant="contained"
        onClick={onSendEmailClick}
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
}

export default SendEmailFooter;
