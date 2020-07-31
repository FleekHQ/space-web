import React from 'react';
import { storiesOf } from '@storybook/react';
import { boolean } from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';

import NotificationButton from './index';
import NotificationMenu from '../NotificationMenu';

const categoryName = 'Notification';

storiesOf(categoryName, module).add('Button', () => {
  const defaultProps = {
    badgeInvisible: boolean('badgeInvisible', false),
  };

  const notificationMenuProps = {
    i18n: {
      accept: 'Accept',
      reject: 'Reject',
      markAsRead: 'Mark all as read',
      notifications: 'Notifications',
    },
    items: [
      {
        id: 1,
        username: 'anonbear',
        timestamp: '2020-07-29T19:46:24.628Z',
        description: 'Shared Branding.zip with you.',
        files: [{
          name: 'Branding.zip',
          ext: 'zip',
        }],
      },
      {
        id: 2,
        username: 'anon334',
        timestamp: '2020-07-29T19:46:24.628Z',
        description: 'Shared resume.pdf with you.',
        files: [{
          name: 'resume.pdf',
          ext: 'pdf',
        }],
      },
    ],
    onMarkAsRead: action('onMarkAsRead'),
    onAcceptInvitation: action('onAcceptInvitation'),
    onRejectInvitation: action('onRejectInvitation'),
  };

  const Container = () => {
    const [anchorEl, setAnchorEl] = React.useState(null);

    const onCloseMenu = () => setAnchorEl(null);
    const onClickHandler = (event) => setAnchorEl(event.currentTarget);

    return (
      <div style={{ padding: 20 }}>
        <NotificationButton
          onClick={onClickHandler}
          {...defaultProps}
        />
        <NotificationMenu
          anchorEl={anchorEl}
          onCloseMenu={onCloseMenu}
          {...notificationMenuProps}
        />
      </div>
    );
  };

  return (
    <Container />
  );
});
