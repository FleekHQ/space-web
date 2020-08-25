import React from 'react';
import { storiesOf } from '@storybook/react';
import { text, number } from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';
import Button from '@material-ui/core/Button';

import BackUpMenuItem from './index';

const categoryName = 'Notification';

storiesOf(categoryName, module).add('BackUpLimit', () => {
  const { PUBLIC_URL } = process.env;

  const defaultProps = {
    currentAmountText: text('currentAmountText', '997.2 MB'),
    limitText: text('limitText', '1 GB'),
    timestamp: number('timestamp', 1598037893916),
    upgradeOnClick: action('upgradeOnClick'),
    logoUrl: `${PUBLIC_URL}/assets/images/space.svg`,
  };

  return (
    <BackUpMenuItem {...defaultProps} />
  );
});
