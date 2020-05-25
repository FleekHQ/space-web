import React, { useState } from 'react';
import { storiesOf } from '@storybook/react';
import { number } from '@storybook/addon-knobs';
import { faFilePlus } from '@fortawesome/pro-regular-svg-icons/faFilePlus';
import { faFolderPlus } from '@fortawesome/pro-regular-svg-icons/faFolderPlus';
import { faFileAlt } from '@fortawesome/pro-regular-svg-icons/faFileAlt';

import { ITEM_TYPES } from './constants';
import CreateNewMenu from './index';

const categoryName = 'ElementalComponents';

storiesOf(categoryName, module).add('CreateNewMenu', () => {
  const [menuOpen, setMenuOpen] = useState(true) 
  const defaultProps = {
    bottom: number('bottom', 220),
    left: number('left', 0),
    items: [
      {
        id: 'file-upload',
        label: 'File Upload',
        type: ITEM_TYPES.OPTION,
        icon: faFilePlus,
      },
      {
        id: 'folder-upload',
        label: 'Folder Upload',
        type: ITEM_TYPES.OPTION,
        icon: faFolderPlus,
      },
      {
        type: ITEM_TYPES.DIVIDER,
      },
      {
        id: 'option-with-submenu',
        label: 'Text Doc',
        type: ITEM_TYPES.OPTION,
        icon: faFileAlt,
        subItems: [
          { 
            id: 'submenu-item',
            type: ITEM_TYPES.OPTION,
            icon: faFilePlus,
          }
        ]
      },
    ],
    actions: {
      'file-upload': () => console.log('upload file'),
      'folder-upload': () => console.log('upload folder'),
      'submenu-item': () => console.log('submenu item'),
    }
  }

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      height: 500,
      width: 200,
      position: 'relative',
    }}>
      <div style={{ display: 'inline-block', height: 300 }}>STUFF</div>
      <CreateNewMenu open={menuOpen} setOpen={setMenuOpen} {...defaultProps} />
      <button onClick={() => setMenuOpen(!menuOpen)}>
        Toggle
      </button>
    </div>
  );
});
