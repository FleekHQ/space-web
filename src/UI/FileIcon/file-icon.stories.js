import React from 'react';
import { storiesOf } from '@storybook/react';

import FileIcon from './index';
import FILE_TYPES from './constants';

const categoryName = 'ElementalComponents';

storiesOf(categoryName, module).add('FileIcon', () => {
  const icons = [
    {
      ext: 'default',
    },
    {
      ext: 'folder',
    },
    {
      ext: 'pdf',
    },
    {
      ext: 'zip',
    },
    {
      ext: 'jpg',
      src: 'https://icatcare.org/app/uploads/2018/07/Thinking-of-getting-a-cat.png',
    },
    {
      ext: 'ppt',
    },
    {
      ext: 'doc',
    },
    {
      ext: 'mp3',
    },
    {
      ext: 'mp4',
    },
  ];
  return (
    <div >
      {icons.map(icon => (
        <div style={{ margin: 5 }}>
          <div style={{ display: 'inline-block', height: 50, width: 50 }}>
            <FileIcon {...icon} />
          </div>
        </div>
      ))}
    </div>
  );
});
