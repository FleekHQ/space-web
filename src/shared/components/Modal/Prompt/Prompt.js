import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import BaseModal from '@ui/BaseModal';
import Typography from '@ui/Typography';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/pro-light-svg-icons/faTimes';
import ButtonBase from '@material-ui/core/ButtonBase';
import TextField from '@ui/TextField';
import Button from '@terminal-packages/space-ui/core/Button';
import { USER_ACTION_TYPES } from '@reducers/user';

import useStyles from './styles';

const Prompt = (props) => {
  const {
    i18n,
    title,
    message,
    onSubmit,
    validate,
    closeModal,
    textFieldProps,
    validateOnChange,
    validateOnSubmit,
  } = props;

  const dispatch = useDispatch();
  const [error, setError] = useState();
  const [value, setValue] = useState('');
  const [loading, setLoading] = useState(false);
  const userState = useSelector((s) => s.user);

  const classes = useStyles();

  const onChange = (e) => {
    if (validateOnChange) {
      setError(validate(e.target.value));
    }

    setValue(e.target.value);
  };

  const onSubmitForm = (e) => {
    e.preventDefault();

    setError(null);
    if (validateOnSubmit) {
      const validationError = validate(value);

      setError(validationError);
      if (!validationError) onSubmit(value, validationError, closeModal);
    } else {
      onSubmit(value, error, closeModal);
    }
  };

  React.useEffect(() => {
    if (userState.updatingUser) {
      setLoading(true);
    }
  }, [userState.updatingUser]);

  React.useEffect(() => {
    if (userState.updatingUserError) {
      setLoading(false);
      setError(userState.updatingUserError);
    }
  }, [userState.updatingUserError]);

  React.useEffect(() => {
    if (userState.updatingUserSuccess) {
      closeModal();
    }
  }, [userState.updatingUserSuccess]);

  React.useEffect(() => (
    () => {
      dispatch({
        type: USER_ACTION_TYPES.ON_UPDATING_USER_RESET,
      });
    }
  ), []);

  return (
    <BaseModal
      onClose={closeModal}
      paperProps={{
        className: classes.root,
      }}
    >
      <div className={classes.header}>
        <Typography variant="h6">
          {title}
        </Typography>
        <ButtonBase onClick={closeModal}>
          <FontAwesomeIcon
            icon={faTimes}
            className={classes.icon}
          />
        </ButtonBase>
      </div>
      {message && (
        <Typography variant="body2" className={classes.message}>
          {message}
        </Typography>
      )}
      <div>
        <form onSubmit={onSubmitForm}>
          <TextField
            fullWidth
            label={i18n.label}
            value={value}
            onChange={onChange}
            error={!!error}
            className={classes.textField}
            // eslint-disable-next-line react/jsx-props-no-spreading
            {...textFieldProps}
          />
          {error && (
            <Typography variant="body2" className={classes.errorMessage}>
              {error}
            </Typography>
          )}
          <div className={classes.buttonContainer}>
            <Button
              onClick={closeModal}
              color="secondary"
              variant="outlined"
              disabled={loading}
            >
              {i18n.cancel}
            </Button>
            <Button
              type="submit"
              variant="primary"
              loading={loading}
              disabled={loading}
              classes={{
                root: classes.btnRoot,
              }}
            >
              {i18n.submit}
            </Button>
          </div>
        </form>
      </div>
    </BaseModal>
  );
};

Prompt.defaultProps = {
  title: '',
  message: '',
  validate: () => null,
  onSubmit: () => {},
  closeModal: () => {},
  validateOnChange: false,
  validateOnSubmit: true,
  textFieldProps: {},
};

Prompt.propTypes = {
  title: PropTypes.string,
  message: PropTypes.string,
  validate: PropTypes.func,
  onSubmit: PropTypes.func,
  closeModal: PropTypes.func,
  validateOnChange: PropTypes.bool,
  validateOnSubmit: PropTypes.bool,
  i18n: PropTypes.shape({
    label: PropTypes.string,
    cancel: PropTypes.string,
    submit: PropTypes.string,
  }).isRequired,
  textFieldProps: PropTypes.shape({}),
};

export default Prompt;
