import React from 'react';
import PropTypes from 'prop-types';
import ToggleButton from '@material-ui/lab/ToggleButton';
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';

import useStyles from './styles';

const SwitchButton = ({ value, onChange, i18n }) => {
  const classes = useStyles({ value });

  return (
    <ToggleButtonGroup
      exclusive
      value={value}
      onChange={onChange}
    >
      <ToggleButton
        value="on"
        classes={{
          root: classes.buttonRoot,
          selected: classes.enableSelected,
        }}
      >
        {i18n.enable}
      </ToggleButton>
      <ToggleButton
        value="off"
        classes={{
          root: classes.buttonRoot,
          selected: classes.disableSelected,
        }}
      >
        {i18n.disable}
      </ToggleButton>
    </ToggleButtonGroup>
  );
};

SwitchButton.propTypes = {
  onChange: PropTypes.func.isRequired,
  value: PropTypes.oneOf(['on', 'off']).isRequired,
  i18n: PropTypes.shape({
    enable: PropTypes.string.isRequired,
    disable: PropTypes.string.isRequired,
  }).isRequired,
};

export default SwitchButton;
