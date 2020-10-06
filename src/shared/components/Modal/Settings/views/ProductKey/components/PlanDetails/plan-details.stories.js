import React from 'react';
import { storiesOf } from '@storybook/react';
import { text, select, number } from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';

import PlanDetails from './index';

const categoryName = 'PlanDetails';

storiesOf(categoryName, module).add('default', () => {
  const defaultProps = {
    plan: text('plan', 'Space Pro'),
    price: text('price', '11.00'),
    billDate: text('billDate', '12/01/2020'),
    paymentType: select('paymentType', [
      'crypto',
      'card',
    ], 'crypto'),
    onChangePlan: action('onChangePlan'),
    amount: number('amount', 12.75),
    onAddFounds: action('onAddFounds'),
    timeRemaining: text('timeRemaining', '1 month'),
    severity: select('severity', [
      'danger',
      'success',
      'warning',
    ], 'success'),
  };

  return (
    <div style={{ padding: 20 }}>
      <PlanDetails {...defaultProps} />
    </div>
  );
});
