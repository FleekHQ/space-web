import React from 'react';
import { storiesOf } from '@storybook/react';

import FileIcon from './index';
import FILE_TYPES from './constants';

const categoryName = 'ElementalComponents';

storiesOf(categoryName, module).add('FileIcon', () => {
  const icons = [
    {
      type: FILE_TYPES.DEFAULT,
    },
    {
      type: FILE_TYPES.FOLDER,
    },
    {
      type: FILE_TYPES.PDF,
    },
    {
      type: FILE_TYPES.ZIP,
    },
    {
      type: FILE_TYPES.IMAGE,
      src: 'https://icatcare.org/app/uploads/2018/07/Thinking-of-getting-a-cat.png',
    },
    {
      type: FILE_TYPES.POWERPOINT,
    },
    {
      type: FILE_TYPES.WORD,
    },
    {
      type: FILE_TYPES.AUDIO,
    },
    {
      type: FILE_TYPES.VIDEO,
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
