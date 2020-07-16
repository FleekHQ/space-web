import React from 'react';
import { storiesOf } from '@storybook/react';
import { boolean, object, array } from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';

import ShareBox from './index';

const categoryName = 'ShareBox';

storiesOf(categoryName, module).add('ShareBox', () => {

  const defaultProps = {
    user: object('user', {
      imgUrl: '',
      username: 'Username',
    }),
    i18n: object('i18n', {
      subtitle: 'Most Recently Shared',
      viewAll: 'View All',
    }),
    objectsList: array('objectsList', [
      {
        ext: 'docx',
        name: 'TechDocsV2.docx',
      },
      {
        ext: 'pdf',
        name: 'IPFS-Report.pdf',
      },
      {
        ext: 'zip',
        name: 'Branding.zip',
      },
    ]),
    onViewAllClick: action('onViewAllClick'),
    onObjectClick: action('onObjectClick'),
    showViewAllBtn: boolean('showViewAllBtn', true),
  };

  return (
    <div
      style={{
        width: 171,
      }}
    >  
      <ShareBox {...defaultProps} />
    </div>
  );
});