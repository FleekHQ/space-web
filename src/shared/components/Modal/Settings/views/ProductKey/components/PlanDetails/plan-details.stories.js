import React from 'react';
import { storiesOf } from '@storybook/react';
import { text } from '@storybook/addon-knobs';

import PlanDetails from './index';

const categoryName = 'PlanDetails';

storiesOf(categoryName, module).add('default', () => {
  const defaultProps = {
    plan: text('plan', 'Space Pro'),
    price: text('price', '11.00'),
    billDate: text('billDate', '12/01/2020'),
    paymentType: text('paymentType', 'Cryptocurrency'),
  };

  return (
    <div style={{ padding: 20 }}>
      <PlanDetails {...defaultProps} />
    </div>
  );
});
