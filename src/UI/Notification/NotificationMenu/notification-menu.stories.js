import React from 'react';
import { storiesOf } from '@storybook/react';
import { object } from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';
import Button from '@material-ui/core/Button';

import NotificationMenu from './index';

const categoryName = 'Notification';

const { PUBLIC_URL } = process.env;

storiesOf(categoryName, module).add('Menu', () => {
  const defaultProps = {
    i18n: object('i18n', {
      empty: 'No notifications',
      accept: 'Accept',
      reject: 'Reject',
      notifications: 'Notifications',
      accepted: 'Accepted',
      rejected: 'Rejected',
    }),
    items: object('items', [
      {
        id: 1,
        type: 'share-invite',
        username: 'anonbear',
        timestamp: '2020-07-29T19:46:24.628Z',
        description: 'Shared Branding.zip with you.',
        files: [{
          name: 'Branding.zip',
          ext: 'zip',
        }],
        status: 'ACCEPTED',
        highlighted: true,
      },
      {
        id: 2,
        type: 'share-invite',
        username: 'anon334',
        timestamp: '2020-07-29T19:46:24.628Z',
        description: 'Shared resume.pdf with you.',
        files: [{
          name: 'resume.pdf',
          ext: 'pdf',
        }],
        status: 'REJECTED',
      },
      {
        id: 3,
        type: 'share-invite',
        username: 'anon334',
        timestamp: '2020-07-29T19:46:24.628Z',
        description: 'Shared resume.pdf with you.',
        files: [{
          name: 'resume.pdf',
          ext: 'pdf',
        }],
        status: 'PENDING',
      },
      {
        id: 4,
        type: 'backup-limit',
        currentAmountText: '997.2 MB',
        limitText: '1 GB',
        timestamp: 1598037893916,
        logoUrl: `${PUBLIC_URL}/assets/images/space.svg`,
      },
    ]),
    onMarkAsRead: action('onMarkAsRead'),
    onAcceptInvitation: action('onAcceptInvitation'),
    onRejectInvitation: action('onRejectInvitation'),
    upgradeOnClick: action('upgradeOnClick'),
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
