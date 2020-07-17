/* eslint-disable react/jsx-props-no-spreading */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import Typography from '@ui/Typography';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import isEqual from 'lodash/isEqual';

import useStyles from './styles';
import PermissionsDropdown from '../../../PermissionsDropdown';

const MemberInput = (props) => {
  const {
    i18n,
    onChange,
    className,
    options: defaultOptions,
    setEmailAddresses,
    emailAddresses,
    collaborators,
  } = props;

  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [options, setOptions] = useState(defaultOptions);

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

  // removes already selected items from the list
  const filteredOptions = collaborators.filter((collaborator) => {
    let collaboratorAlreadyChosen = false;
    emailAddresses.forEach(emailAddress => {
      if (isEqual(emailAddress, collaborator)) {
        collaboratorAlreadyChosen = true;
      }
    });
    return !collaboratorAlreadyChosen;
  });

  return (
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
        multiple
        placeholder={i18n.placeholder}
        options={filteredOptions}
        getOptionLabel={(option) => option.mainText}
        classes={{
          root: classes.autocomplete,
        }}
        onChange={(e, newValue) => setEmailAddresses(newValue)}
        renderInput={(params) => (
          <TextField
            {...params}
            InputProps={{
              ...params.InputProps,
              endAdornment: () => null,
              disableUnderline: true,
            }}
            placeholder={i18n.placeholder}
            classes={{
              root: classes.textfield,
            }}
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
  );
};

MemberInput.defaultProps = {
  className: null,
  collaborators: [],
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
  emailAddresses: PropTypes.array.isRequired,
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
