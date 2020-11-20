import React from 'react';
import { storiesOf } from '@storybook/react';
import { text, select, boolean } from '@storybook/addon-knobs';

import MessageBox from './MessageBox';

const categoryName = 'MessageBox';

storiesOf(categoryName, module).add('MessageBox', () => {
  const defaultProps = {
    title: text('title', 'What is the Paper Key?'),
    bgColor: select('bgColor', [
      'primary',
      'secondary',
      null,
    ], null),
    type: select('type', [
      'info',
      'danger',
      'upgrade',
      'shield',
      null,
    ], null),
    isRainbow: boolean('isRainbow', false),
  };

  return (
    <div style={{ padding: 20 }}>
      <MessageBox {...defaultProps}>
        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Cupiditate maiores explicabo minus eaque distinctio, incidunt tempora inventore laborum a ut ipsa optio eveniet! Eligendi quod voluptatem quaerat illo doloremque laboriosam!
      </MessageBox>
    </div>
  );
});
