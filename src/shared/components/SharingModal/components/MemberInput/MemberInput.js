/* eslint-disable */
import React from 'react';
import PropTypes from 'prop-types';
import TextField from '@ui/TextField';
import Typography from '@ui/Typography';
import InputBase from '@material-ui/core/InputBase';

import useStyles from './styles';
import PermissionsDropdown from '../../../PermissionsDropdown';

const MemberInput = (props) => {
  const {
    i18n,
    options,
    onChange,
    defaultOption,
  } = props;

  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Typography>
        {i18n.to}
      </Typography>
      <InputBase
        placeholder={i18n.placeholder}
        inputProps={{ 'aria-label': 'naked' }}
        classes={{
          input: classes.input,
          root: classes.inputRoot,
        }}
      />
      <PermissionsDropdown
        options={options}
        onChange={onChange}
        defaultOption={defaultOption}
      />
    </div>
  );
};

MemberInput.propTypes = {
  i18n: PropTypes.shape({
    to: PropTypes.string.isRequired,
    placeholder: PropTypes.string.isRequired,
  }).isRequired,
  onChange: PropTypes.func.isRequired,
  defaultOption: PropTypes.string.isRequired,
  options: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
  })).isRequired,
};

export default MemberInput;
