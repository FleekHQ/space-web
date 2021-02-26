import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';

import Box from '@material-ui/core/Box';
import Button from '@terminal-packages/space-ui/core/Button';
import RainbowField from '@ui/RainbowField';
import { checkIsEmail } from '@utils';

import useStyles from './styles';

const PasswordLessForm = ({
  onSubmit,
  isLoading,
  onChangeForm,
  submitBtnText,
  defaultEmail,
}) => {
  const classes = useStyles();
  const { t } = useTranslation();
  const [email, setEmail] = React.useState(defaultEmail);

  const handleSubmit = (event) => {
    event.preventDefault();

    onSubmit({
      email,
    });
  };

  const handleInputChange = (event) => {
    const { value } = event.target;

    setEmail(value);
    onChangeForm({
      email: value,
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <Box
        isDark
        mb="23px"
        type="email"
        name="email"
        value={email}
        component={RainbowField}
        label={t('common.email')}
        onChange={handleInputChange}
      />
      <Button
        fullWidth
        type="submit"
        loading={isLoading && email.length > 0}
        classes={{
          disabled: classes.btnDisabled,
        }}
        disabled={isLoading || email.length === 0 || !checkIsEmail(email)}
      >
        {submitBtnText}
      </Button>
    </form>
  );
};

PasswordLessForm.defaultProps = {
  isLoading: false,
  defaultEmail: '',
  onChangeForm: () => null,
};

PasswordLessForm.propTypes = {
  isLoading: PropTypes.bool,
  onChangeForm: PropTypes.func,
  defaultEmail: PropTypes.string,
  onSubmit: PropTypes.func.isRequired,
  submitBtnText: PropTypes.string.isRequired,
};

export default PasswordLessForm;
