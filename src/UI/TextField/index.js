import React from 'react';
import PropTypes from 'prop-types';
import TextField from '@material-ui/core/TextField';

const FleekTextField = ({ variant, label, InputProps, ...props }) => {
  const labelPropName = variant === 'outlined' ? 'label' : 'placeholder';

  return (
    <TextField
      {...{[labelPropName]: label}}
      variant={variant}
      InputProps={{ 
        disableUnderline: variant === 'filled',
        ...InputProps,
      }}
      {...props}
    />
  );
};

FleekTextField.defaultProps = {
  variant: 'outlined',
  label: '',
};

FleekTextField.propTypes = {
  variant: PropTypes.oneOf(['outlined', 'filled']),
  label: PropTypes.string,
};

export default FleekTextField;
