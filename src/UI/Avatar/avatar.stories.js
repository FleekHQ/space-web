import React from 'react';
import { storiesOf } from '@storybook/react';
import { text, number } from '@storybook/addon-knobs';

import Avatar from './index';

const categoryName = 'Avatar';

storiesOf(categoryName, module).add('Avatar', () => {

  const defaultProps = {
    id: text('id', ''),
    alt: text('alt', ''),
    size: number('size', 80),
    imgUrl: text('imgUrl', 'https://image.flaticon.com/icons/svg/168/168732.svg'),
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
