import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import { useTranslation } from 'react-i18next';
import IconButton from '@material-ui/core/IconButton';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import InputAdornment from '@material-ui/core/InputAdornment';
import { faEye } from '@fortawesome/free-solid-svg-icons/faEye';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEyeSlash } from '@fortawesome/free-solid-svg-icons/faEyeSlash';

import useStyles from './styles';
import PasswordTooltip from '../PasswordTooltip';

const PasswordLinkForm = (props) => {
  const { onSave, onCancel, loading } = props;

  const [password, setPassword] = useState();
  const [showPassword, setShowPassword] = useState(false);

  const classes = useStyles();
  const { t } = useTranslation();

  const handleShowPassword = () => setShowPassword(!showPassword);

  const endAdornment = (
    <InputAdornment position="end">
      <IconButton
        onClick={handleShowPassword}
        onMouseDown={(e) => e.preventDefault()}
        className={classes.iconButton}
      >
        {showPassword ? (
          <FontAwesomeIcon
            icon={faEye}
            className={classes.icon}
          />
        ) : (
          <FontAwesomeIcon
            icon={faEyeSlash}
            className={classes.icon}
          />
        )}
      </IconButton>
    </InputAdornment>
  );

  return (
    <div className={classes.root}>
      <PasswordTooltip>
        <OutlinedInput
          value={password}
          variant="outlined"
          disabled={loading}
          className={classes.input}
          endAdornment={endAdornment}
          type={showPassword ? 'text' : 'password'}
          onChange={(e) => setPassword(e.target.value)}
          placeholder={t('modals.sharingModal.shareLink.passwordPlaceholder')}
          inputProps={{
            className: classes.placeholder,
          }}
        />
      </PasswordTooltip>
      <Button
        onClick={() => {
          onSave(password);
        }}
        variant="contained"
        disabled={loading}
        className={classes.button}
      >
        {t('common.save')}
      </Button>
      <Button
        variant="outlined"
        onClick={() => {
          onCancel();
        }}
        disabled={loading}
        className={classes.button}
      >
        {t('common.cancel')}
      </Button>
    </div>
  );
};

PasswordLinkForm.defaultProps = {
  loading: false,
};

PasswordLinkForm.propTypes = {
  loading: PropTypes.bool,
  onSave: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
};

export default PasswordLinkForm;
