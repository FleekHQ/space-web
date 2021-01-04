import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { text, object, boolean } from '@storybook/addon-knobs';
import { faShare } from '@fortawesome/pro-regular-svg-icons/faShare';
import { faLink } from '@fortawesome/pro-regular-svg-icons/faLink';
import { faTrash } from '@fortawesome/pro-regular-svg-icons/faTrash';

import Topbar from './index';

const categoryName = 'Preview/components';

storiesOf(categoryName, module).add('Topbar', () => {
  const defaultProps = {
    filename: text('filename', 'TwitterProPic.jpg'),
    ext: text('ext', 'jpg'),
    onPrint: action('onPrint'),
    onDownload: action('onDownload'),
    onInfo: action('onInfo'),
    onSignIn: action('onSignIn'),
    onBack: action('onBack'),
    onOptionClick: action('onOptionClick'),
    i18n: object('i18n', {
      signin: 'Sign In',
    }),
    menuOptions: object('menuOptions', [
      {
        id: 'share',
        title: 'Share',
        icon: faShare,
        iconSize: 10,
        type: 'option'
      },
      {
        id: 'get-link',
        title: 'Get link',
        icon: faLink,
        iconSize: 10,
        type: 'option'
      },
      {
        type: 'divider',
      },
      {
        id: 'delete',
        title: 'Delete',
        icon: faTrash,
        iconSize: 11,
        type: 'option'
      },
    ]),
    showSignin: boolean('showSignin', false),
  };

  return (
    <Topbar {...defaultProps} />
  );
});
