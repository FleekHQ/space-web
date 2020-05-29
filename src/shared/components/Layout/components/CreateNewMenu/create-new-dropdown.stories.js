import React, { useState } from 'react';
import { storiesOf } from '@storybook/react';
import { faFilePlus } from '@fortawesome/pro-regular-svg-icons/faFilePlus';
import { faFolderPlus } from '@fortawesome/pro-regular-svg-icons/faFolderPlus';
import { faFileAlt } from '@fortawesome/pro-regular-svg-icons/faFileAlt';
import Divider from '@material-ui/core/Divider';

import Option from './components/Option';
import CreateNewMenu from './index';

const categoryName = 'ElementalComponents';

storiesOf(categoryName, module).add('CreateNewMenu', () => {
  const [menuOpen, setMenuOpen] = useState(true) 
  const defaultProps = {
    items: [
      {
        id: 'file-upload',
        label: 'File Upload',
        component: Option,
        icon: faFilePlus,
        onClick: () => console.log('upload file'),
      },
      {
        id: 'folder-upload',
        label: 'Folder Upload',
        component: Option,
        icon: faFolderPlus,
        onClick: () => console.log('upload folder'),
      },
      {
        component: Divider,
      },
      {
        id: 'option-with-submenu',
        label: 'Text Doc',
        component: Option,
        icon: faFileAlt,
        subItems: [
          { 
            id: 'submenu-item',
            component: Option,
            icon: faFilePlus,
            onClick: () => console.log('submenu action'),
          }
        ]
      },
    ],
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
