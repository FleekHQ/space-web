import React from 'react';
import { storiesOf } from '@storybook/react';
import { boolean, object, array } from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';

import ShareBox, { ShareBoxSkeleton } from './index';

const categoryName = 'ShareBox';

storiesOf(categoryName, module).add('ShareBox', () => {

  const defaultProps = {
    usersList: object('usersList', [{
      imgUrl: '',
      username: 'Username',
      address: '0xd606f05a2a980f58737aa913553c8d6eac8b',
      publicKey: '67730a6678566ead5911d71304854daddb1fe98a396551a4be01de65da01f3a9',
      isOwner: false,
    }]),
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
    <div style={{ display: 'flex' }}>
      <div style={{ width: 171 }}>  
        <ShareBoxSkeleton i18n={defaultProps.i18n} />
      </div>
      <div style={{ width: 171, marginLeft: 20 }}>  
        <ShareBox {...defaultProps} objectsList={[]} />
      </div>
      <div style={{ width: 171, marginLeft: 20 }} >  
        <ShareBox {...defaultProps} />
      </div>
    </div>
  );
});