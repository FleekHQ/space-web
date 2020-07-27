import React from 'react';
import { storiesOf } from '@storybook/react';
import Typography from '@material-ui/core/Typography';
import { text, boolean, number } from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';

import BaseModal from './index';

const categoryName = 'ElementalComponents';

storiesOf(categoryName, module).add('BaseModal', () => {
  const defaultProps = {
    onClose: action('onClose'),
    maxWidth: number('maxWidth', 500),
  };

  return (
    <div>
      Background
      <BaseModal {...defaultProps}>
        <h1 style={{ padding: 20, background: 'aliceblue', margin: 0 }}>
          Children Content
        </h1>
      </BaseModal>
    </div>
  );
});
