import React from 'react';
import { storiesOf } from '@storybook/react';
import { object } from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';

import Footer from './index';

const categoryName = 'SharingModal.Components';

storiesOf(categoryName, module).add('Footer', () => {
  const defaultProps = {
    i18n: object('i18n', {
      cta: 'Create link',
      canView: 'Can view',
      title: 'Share a link instead',
      description: 'No link created yet.',
    }),
    onClick: action('onClick'),
  };

  return (
    <Footer {...defaultProps} />
  );
});
