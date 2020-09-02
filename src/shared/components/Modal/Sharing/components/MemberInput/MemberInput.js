/* eslint-disable react/jsx-props-no-spreading */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import Typography from '@ui/Typography';
import TextField from '@material-ui/core/TextField';
import Autocomplete, { createFilterOptions } from '@material-ui/lab/Autocomplete';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { faTimes } from '@fortawesome/pro-light-svg-icons/faTimes';
import CollaboratorInput from '../CollaboratorInput';
import useStyles from './styles';
import Collaborator from '../../../../Collaborator';
import PermissionsDropdown from '../../../../PermissionsDropdown';
import getFilteredOptions from './utils/get-filtered-options';

const MemberInput = (props) => {
  const {
    i18n,
    onChange,
    className,
    loading,
    options: defaultOptions,
    setUsernames,
    usernames,
    collaborators,
  } = props;

  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [options, setOptions] = useState(defaultOptions);
  const [usernameInput, setUsernameInput] = useState('');

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

  const filteredOptions = getFilteredOptions(usernames, [
    ...(usernameInput && usernameInput !== '' && [{
      id: usernameInput,
      mainText: usernameInput,
      username: usernameInput,
    }]),
    ...collaborators,
  ]);

  const filterOptions = createFilterOptions({
    stringify: (option) => `${option.mainText} ${option.secondaryText}`,
  });

  return (
    <div>
      <Typography
        className={classes.shareVia}
      >
        {i18n.shareVia}
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
          disabled={loading}
          filterOptions={filterOptions}
          multiple
          value={usernames}
          inputValue={usernameInput}
          options={filteredOptions}
          getOptionLabel={(option) => (
            <CollaboratorInput
              imageSrc={option.imageSrc}
              mainText={option.mainText}
            />
          )}
          fullWidth
          ChipProps={{
            classes: {
              root: classes.chip,
              label: classes.chipLabel,
            },
            deleteIcon: (
              <FontAwesomeIcon
                className={classes.chipIcon}
                icon={faTimes}
              />
            ),
          }}
          classes={{
            root: classes.autocomplete,
            option: classes.option,
          }}
          onInputChange={(e) => {
            // There is a bug with <Autocomplete /> where sometimes the event is null
            // so we must verify that the event exist before getting the target
            const newUsername = (e && e.target.value) || '';
            setUsernameInput(newUsername);
          }}
          onChange={(e, newValue) => setUsernames(newValue)}
          renderInput={(params) => (
            <TextField
              {...params}
              fullWidth
              InputProps={{
                ...params.InputProps,
                endAdornment: () => null,
                disableUnderline: true,
              }}
              placeholder={usernames.length > 0 ? '' : i18n.placeholder}
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
          className={classes.permissionDropdown}
        />
      </div>
    </div>
  );
};

MemberInput.defaultProps = {
  className: null,
  collaborators: [],
  usernames: [],
  loading: false,
};

MemberInput.propTypes = {
  className: PropTypes.string,
  loading: PropTypes.bool,
  i18n: PropTypes.shape({
    to: PropTypes.string.isRequired,
    placeholder: PropTypes.string.isRequired,
    shareVia: PropTypes.string.isRequired,
  }).isRequired,
  onChange: PropTypes.func.isRequired,
  options: PropTypes.arrayOf(PropTypes.shape({
    danger: PropTypes.bool,
    selected: PropTypes.bool,
    description: PropTypes.string,
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
  })).isRequired,
  setUsernames: PropTypes.func.isRequired,
  usernames: PropTypes.arrayOf(PropTypes.shape({
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
};

export default MemberInput;
