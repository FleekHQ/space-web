import React from 'react';
import { storiesOf } from '@storybook/react';
import { number, object } from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';

import GeneralItem from './index';

const categoryName = 'Notification';

storiesOf(categoryName, module).add('General', () => {
  const { PUBLIC_URL } = process.env;
  const defaultProps = {
    timestamp: number('timestamp', 1598037893916),
    onClick: action('onClick'),
    logoUrl: `${PUBLIC_URL}/assets/images/space.svg`,
    i18n: object('i18n', {
      title: 'Space',
      warning: 'Replenish your balance',
      boxText1: 'Current Balance:',
      boxText2: '$11.25',
      description: 'Your balance is getting low. We recommend adding more funds to make sure you have enough to cover your Space storage/usage for the next few months. This way you never have to worry about it getting too low',
      buttonText: 'Add Funds',
    }),
  };

  return (
    <GeneralItem {...defaultProps} />
  );
});
