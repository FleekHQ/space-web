import React from 'react';
import { storiesOf } from '@storybook/react';

import HoverMenu, { HOVER_OPTION_IDS } from './index';
import { faSyncAlt } from '@fortawesome/pro-regular-svg-icons/faSyncAlt';
import { faTimes } from '@fortawesome/pro-regular-svg-icons/faTimes';

const categoryName = 'HoverMenu';

storiesOf(categoryName, module).add('default', () => {
  const defaultProps = {
    menuItemOnClick: (id) => { console.log(id) },
    i18n: {
      cancel: 'Cancel',
      retry: 'Retry',
    },
    items: [
      {
        id: HOVER_OPTION_IDS.retry,
        icon: faSyncAlt,
      },
      {
        id: HOVER_OPTION_IDS.cancel,
        icon: faTimes,
      },
    ]
  };

  return (
    <div style={{ padding: 100 }}>
      <HoverMenu {...defaultProps} />
    </div>
  );
});
