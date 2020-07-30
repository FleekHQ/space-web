import React from 'react';
import { storiesOf } from '@storybook/react';
import { text, object } from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';

import NotificationItem from './index';

const categoryName = 'Notification';

storiesOf(categoryName, module).add('MenuItem', () => {
  const defaultProps = {
    onAccept: action('accept'),
    onReject: action('reject'),
    username: text('username', 'anonbear'),
    description: text('description', 'Shared Branding.zip with you.'),
    timestamp: text('timestamp', '2020-07-29T19:46:24.628Z'),
    files: object('files', [
      {
        name: 'Branding.zip',
        ext: 'zip',
      }
    ]),
    i18n: {
      accept: 'Accept',
      reject: 'Reject',
    },
  };

  return (
    <div style={{ backgroundColor: 'white' }}>
      <NotificationItem {...defaultProps} />
    </div>
  );
});
