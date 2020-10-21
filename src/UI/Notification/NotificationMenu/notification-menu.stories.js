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
        id: 'general',
        type: 'general',
        onClick: () => {},
        i18n: {
          title: 'Space',
          warning: 'Replenish your balance',
          boxText1: 'Current Balance:',
          boxText2: '$11.25',
          description: 'Your balance is getting low. We recommend adding more funds to make sure you have enough to cover your Space storage/usage for the next few months. This way you never have to worry about it getting too low',
          buttonText: 'Add Funds',
        },
        timestamp: 1598037893916,
        logoUrl: `${PUBLIC_URL}/assets/images/space.svg`,
      },
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
