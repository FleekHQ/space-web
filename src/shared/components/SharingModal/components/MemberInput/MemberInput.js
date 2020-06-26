import React, { useState } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import Typography from '@ui/Typography';
import InputBase from '@material-ui/core/InputBase';

import useStyles from './styles';
import PermissionsDropdown from '../../../PermissionsDropdown';

const MemberInput = (props) => {
  const {
    i18n,
    onChange,
    className,
    options: defaultOptions,
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
      <InputBase
        placeholder={i18n.placeholder}
        inputProps={{ 'aria-label': 'naked' }}
        classes={{
          input: classes.input,
          root: classes.inputRoot,
        }}
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
};

export default MemberInput;
