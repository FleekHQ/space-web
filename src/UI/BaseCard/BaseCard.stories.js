import React from 'react';
import { storiesOf } from '@storybook/react';
import { text } from '@storybook/addon-knobs';
import Avatar from '../Avatar';
import BaseCard from './index';

const categoryName = 'BaseCard';

storiesOf(categoryName, module).add('BaseCard', () => {

  const props = {
    padding: text('padding', '') || undefined,
  };

  return (
    <div
      style={{
        width: 500,
        height: 500,
        padding: 30,
        backgroundColor: '#f6f8fc',
      }}
    >
      <BaseCard {...props}>
        Content
        <div style={{ marginLeft: 'auto' }}>
          <Avatar username="username" size={32} />
        </div>
      </BaseCard>
    </div>
  );
});