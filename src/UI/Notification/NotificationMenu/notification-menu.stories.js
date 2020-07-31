import React from 'react';
import { storiesOf } from '@storybook/react';
import { object } from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';
import Button from '@material-ui/core/Button';

import NotificationMenu from './index';

const categoryName = 'Notification';

storiesOf(categoryName, module).add('Menu', () => {
  const defaultProps = {
    i18n: object('i18n', {
      accept: 'Accept',
      reject: 'Reject',
      markAsRead: 'Mark all as read',
      notifications: 'Notifications',
    }),
    items: object('items', [
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
    ]),
    onMarkAsRead: action('onMarkAsRead'),
    onAcceptInvitation: action('onAcceptInvitation'),
    onRejectInvitation: action('onRejectInvitation'),
  };

  const Container = () => {
    const [anchorEl, setAnchorEl] = React.useState(null);

    const onCloseMenu = () => setAnchorEl(null);
    const onClickHandler = (event) => setAnchorEl(event.currentTarget);

    return (
      <div>
        <Button
          variant="contained"
          onClick={onClickHandler}
        >
          Open Menu
        </Button>
        <NotificationMenu
          anchorEl={anchorEl}
          onCloseMenu={onCloseMenu}
          {...defaultProps}
        />
      </div>
    );
  };

  return (
    <Container />
  );
});
