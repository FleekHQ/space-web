import React, { useState } from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { text, object } from '@storybook/addon-knobs';

import ShareLink from './index';

const categoryName = 'ShareLink';

storiesOf(categoryName, module).add('default', () => {
  const defaultProps = {
    url: text('url', 'space.app-documents/techdocsv2.docx'),
    onClickCopyLink: action('onClickCopyLink'),
    i18n: object('i18n', {
      title: 'Get Link',
      copyLink: 'Copy link'
    }),
  };

  const Component = () => {
    const [options, setOptions] = useState([
      {
        id: 'private',
        title: 'Only people invited',
        description: 'Only people added to this file can access this link',
        selected: true,
      },
      {
        id: 'public',
        title: 'Public',
        description: 'Anyone with this link can view',
        selected: false,
      },
    ]);

    const selectedOption = options.find((option) => option.selected) || options[0];

    const onOptionClick = (option) => setOptions(options.map((opt) => ({
      ...opt,
      selected: opt.id === option.id,
    })));


    return (
      <ShareLink
        options={options}
        icon={selectedOption.id}
        onOptionClick={onOptionClick}
        {...defaultProps}
      />
    );
  };

  return (
    <Component />
  );
});
