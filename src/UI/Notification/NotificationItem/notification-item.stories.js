import React from 'react';
import { storiesOf } from '@storybook/react';
import { text, object, boolean, number } from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';

import NotificationItem from './index';

const categoryName = 'Notification';

storiesOf(categoryName, module).add('MenuItem', () => {
  const defaultProps = {
    onAccept: action('accept'),
    onReject: action('reject'),
    username: text('username', 'anonbear'),
    description: text('description', 'Shared Branding.zip with you.'),
    timestamp: number('timestamp', 1603290853),
    highlighted: boolean('highlighted'),
    files: object('files', [
      {
        name: 'Branding.zip',
        ext: 'zip',
      },
      {
        name: 'Branding5552.zip',
        ext: 'zip',
      },
      {
        name: 'Branding222.zip',
        ext: 'zip',
      },      {
        name: 'Branding2555.zip',
        ext: 'zip',
      },
      {
        name: 'Branding2.zip',
        ext: 'zip',
      },
      {
        name: 'Branding5552.zip',
        ext: 'zip',
      },
      {
        name: 'Branding552.zip',
        ext: 'zip',
      }
    ]),
    i18n: {
      accept: 'Accept',
      reject: 'Reject',
      accepted: 'Accepted',
      rejected: 'Rejected',
    },
  };

  return (
    <div style={{ backgroundColor: 'white' }}>
      <NotificationItem {...defaultProps} />
    </div>
  );
});
