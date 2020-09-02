import React from 'react';
import { storiesOf } from '@storybook/react';
import { text, number, boolean } from '@storybook/addon-knobs';

import Avatar from './index';

const categoryName = 'Avatar';

storiesOf(categoryName, module).add('Avatar', () => {

  const defaultProps = {
    size: number('size', 50),
    imgUrl: text('imgUrl', null),
    active: boolean('active', false),
    isLoading: boolean('isLoading', false),
    username: text('username', 'someuser'),
  };

  return (
    <div
      style={{
        width: 500,
        height: 150,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#eeeeee',
      }}
    >
      <Avatar {...defaultProps} />
    </div>
  );
});