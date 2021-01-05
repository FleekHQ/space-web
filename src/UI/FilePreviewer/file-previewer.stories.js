import React from 'react';
import FilePreviewer from './index';
import { storiesOf } from '@storybook/react';
import { select } from '@storybook/addon-knobs';

const categoryName = 'FilePreviewer';

storiesOf(categoryName, module).add('default', () => {
  const defaultProps = {
    url: select('url', [
      'https://bitcoin.org/bitcoin.pdf',
      'https://fleek-team-bucket.storage.fleek.co/Blog%20Inline/Sprouting.gif',
      'https://gateway.ipfs.io/ipfs/QmZEKBgWZngnEYudUQa5YngzaTrQ3LgAHWdoAZNqts8nJs',
    ], 'https://bitcoin.org/bitcoin.pdf'),
  };

  return (
      <div style={{ backgroundColor: 'black', width: '100%', 'height': '1200px' }}>
        <h1>file viewer</h1>
        <FilePreviewer {...defaultProps} />
    </div>
  );
});
