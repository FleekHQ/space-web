import React from 'react';
import { storiesOf } from '@storybook/react';
import { object } from '@storybook/addon-knobs';

import IconsNavigation from './index';

const categoryName = 'ElementalComponents';

storiesOf(categoryName, module).add('IconsNavigation', () => {

  const defaultProps = {
    options: object('options', [
      {
        active: true,
        icon: 'files',
        href: '#'
      },
      {
        icon: 'comments',
      },
      {
        icon: 'settings',
      },
    ]),
  };

  return <IconsNavigation {...defaultProps} />;
});
