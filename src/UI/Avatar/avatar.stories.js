import React from 'react';
import { storiesOf } from '@storybook/react';
import { text, number } from '@storybook/addon-knobs';

import Avatar from './index';

const categoryName = 'Avatar';

storiesOf(categoryName, module).add('Avatar', () => {

  const defaultProps = {
    size: number('size', 80),
    imgUrl: text('imgUrl', null),
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