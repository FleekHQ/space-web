import React, { useState } from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { object, boolean, select } from '@storybook/addon-knobs';

import PermissionsDropdown from './index';

const categoryName = 'PermissionsDropdown';

storiesOf(categoryName, module).add('Menu', () => {
  const defaultProps = {
    disableBorder: boolean('disableBorder', false),
    options: object('options', [
      {
        id: 'edit',
        selected: true,
        title: 'Can edit',
        description: 'Members can edit, delete, and add the file to their Space.',
      },
      {
        id: 'view',
        selected: false,
        title: 'Can view',
        description: 'Members can view and download.',
      },
      {
        id: 'remove',
        title: 'Remove',
        danger: true,
      },
    ]),
  };

  const DropdownWrapper = () => {
    const [open, setOpen] = useState(false);
    const [options, setOptions] = useState(defaultProps.options);

    const handleClose = () => setOpen(false);
    const handleToggle = () => setOpen(!open);

    const onChange = (e, option) => {
      if (option.id === 'remove') {
        setOpen(false);
        return console.log('remove');
      }

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
    };

    return (
      <PermissionsDropdown
        open={open}
        options={options}
        onChange={onChange}
        handleClose={handleClose}
        handleToggle={handleToggle}
        disableBorder={defaultProps.disableBorder}
      />
    );
  };

  return (
    <div style={{ height: 500 }}>
      <DropdownWrapper />
    </div>
  );
});
