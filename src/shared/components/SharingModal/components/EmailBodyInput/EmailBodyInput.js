import React from 'react';
import InputBase from '@material-ui/core/InputBase';
import PropTypes from 'prop-types';
import useStyles from './styles';

const EmailBodyInput = (props) => {
  const {
    placeholder,
    setEmailBody,
    emailBody,
  } = props;

  const onChange = (e) => {
    setEmailBody(e.target.value);
  };

  const classes = useStyles();

  return (
    <div className={classes.container}>
      <InputBase
        value={emailBody}
        placeholder={placeholder}
        multiline
        onChange={onChange}
      />
    </div>
  );
};

EmailBodyInput.defaultProps = {
  emailBody: '',
};

EmailBodyInput.propTypes = {
  emailBody: PropTypes.string,
  setEmailBody: PropTypes.func.isRequired,
  placeholder: PropTypes.string.isRequired,
};

export default EmailBodyInput;
