/* eslint-disable react/jsx-props-no-spreading */
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import Typography from '@ui/Typography';
import TextField from '@material-ui/core/TextField';
import Autocomplete, { createFilterOptions } from '@material-ui/lab/Autocomplete';

import CollaboratorInput from '../CollaboratorInput';
import useStyles from './styles';
import Collaborator from '../../../Collaborator';
import PermissionsDropdown from '../../../PermissionsDropdown';
import isEmailError from './utils/email-validation';
import getFilteredOptions from './utils/get-filtered-options';

const MemberInput = (props) => {
  const {
    i18n,
    onChange,
    className,
    options: defaultOptions,
    setEmailAddresses,
    emailAddresses,
    collaborators,
    showEmailBody,
    setShowEmailBody,
    emailErrors,
  } = props;

  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [options, setOptions] = useState(defaultOptions);
  const [emailInput, setEmailInput] = useState('');
  const [emailError, setEmailError] = useState(null);

  useEffect(() => {
    const userEnteredInput = emailInput.length > 0 || emailAddresses.length > 0;
    if (userEnteredInput && !showEmailBody) {
      setShowEmailBody(true);
    }
    if (!userEnteredInput && showEmailBody) {
      setShowEmailBody(false);
    }
  }, [emailInput, emailAddresses]);

  const handleClose = () => setOpen(false);
  const handleToggle = () => setOpen(!open);

  const handleOnChange = (e, option) => {
    setOpen(false);

    setOptions(options.map((opt) => {
      if (opt.id === option.id) {
        return {
          ...opt,
          selected: true,
        };
      }

      return {
        ...opt,
        selected: false,
      };
    }));

    onChange(option);
  };

  const filteredOptions = getFilteredOptions(emailAddresses, collaborators);

  const onKeyDown = (e) => {
    // if the user press the Enter key
    if (e.keyCode === 13) {
      const newEmail = e.target.value;

      const isError = isEmailError(newEmail, emailAddresses, setEmailError, emailErrors);

      if (isError) {
        return;
      }

      let newEntry = {
        id: e.target.value,
        mainText: e.target.value,
        secondaryText: e.target.value,
        imageSrc: null,
      };

      const emailInOptions = filteredOptions.find((option) => option.id === newEmail);

      if (emailInOptions) {
        newEntry = emailInOptions;
      }

      setEmailAddresses([
        ...emailAddresses,
        newEntry,
      ]);
      setEmailInput('');
    }
  };

  const filterOptions = createFilterOptions({
    stringify: (option) => `${option.mainText} ${option.secondaryText}`,
  });

  return (
    <div>
      <Typography
        className={classes.emailError}
        variant="body2"
      >
        {emailError}
      </Typography>
      <div
        className={classnames(
          classes.root,
          className,
        )}
      >
        <Typography>
          {i18n.to}
        </Typography>
        <Autocomplete
          filterOptions={filterOptions}
          multiple
          value={emailAddresses}
          inputValue={emailInput}
          options={filteredOptions}
          getOptionLabel={(option) => (
            <CollaboratorInput
              imageSrc={option.imageSrc}
              mainText={option.mainText}
            />
          )}
          onKeyDown={onKeyDown}
          fullWidth
          classes={{
            root: classes.autocomplete,
          }}
          onInputChange={(e) => {
            // There is a bug with <Autocomplete /> where sometimes the event is null
            // so we must verify that the event exist before getting the target
            const newEmail = (e && e.target.value) || '';
            setEmailInput(newEmail);
            if (newEmail !== emailInput) {
              setEmailError(null);
            }
          }}
          onChange={(e, newValue) => setEmailAddresses(newValue)}
          renderInput={(params) => (
            <TextField
              {...params}
              fullWidth
              InputProps={{
                ...params.InputProps,
                endAdornment: () => null,
                disableUnderline: true,
              }}
              placeholder={emailAddresses.length > 0 ? '' : i18n.placeholder}
            />
          )}
          renderOption={(option) => (
            <Collaborator
              imageSrc={option.imageSrc}
              mainText={option.mainText}
              secondaryText={option.secondaryText}
            />
          )}
        />
        <PermissionsDropdown
          open={open}
          options={options}
          onChange={handleOnChange}
          handleClose={handleClose}
          handleToggle={handleToggle}
        />
      </div>
    </div>
  );
};

MemberInput.defaultProps = {
  className: null,
  collaborators: [],
  emailAddresses: [],
};

MemberInput.propTypes = {
  className: PropTypes.string,
  i18n: PropTypes.shape({
    to: PropTypes.string.isRequired,
    placeholder: PropTypes.string.isRequired,
  }).isRequired,
  onChange: PropTypes.func.isRequired,
  options: PropTypes.arrayOf(PropTypes.shape({
    danger: PropTypes.bool,
    selected: PropTypes.bool,
    description: PropTypes.string,
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
  })).isRequired,
  setEmailAddresses: PropTypes.func.isRequired,
  emailAddresses: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string,
    isOwner: PropTypes.bool,
    avatar: PropTypes.string,
    mainText: PropTypes.string,
    secondaryText: PropTypes.string,
    permissionsId: PropTypes.string,
  })),
  collaborators: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string,
    isOwner: PropTypes.bool,
    avatar: PropTypes.string,
    mainText: PropTypes.string,
    secondaryText: PropTypes.string,
    permissionsId: PropTypes.string,
  })),
  showEmailBody: PropTypes.bool.isRequired,
  setShowEmailBody: PropTypes.func.isRequired,
  emailErrors: PropTypes.shape({
    invalidEmail: PropTypes.string.isRequired,
    duplicateEmail: PropTypes.string.isRequired,
  }).isRequired,
};

export default MemberInput;
