import React from 'react';
import PropTypes from 'prop-types';
import TextField from '@material-ui/core/TextField';

const FleekTextField = ({
  variant, label, InputProps, ...props
}) => {
  const labelPropName = variant === 'outlined' ? 'label' : 'placeholder';

  return (
    <TextField
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...{ [labelPropName]: label }}
      variant={variant}
      InputProps={{
        disableUnderline: variant === 'filled',
        ...InputProps,
      }}
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...props}
    />
  );
};

FleekTextField.defaultProps = {
  variant: 'outlined',
  label: '',
  InputProps: {},
};

FleekTextField.propTypes = {
  variant: PropTypes.oneOf(['outlined', 'filled', 'standard']),
  label: PropTypes.string,
  // eslint-disable-next-line react/forbid-prop-types
  InputProps: PropTypes.object,
};

export default FleekTextField;
