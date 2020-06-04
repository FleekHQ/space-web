import React, { useState } from 'react';
import { storiesOf } from '@storybook/react';
import { faFileUpload } from '@fortawesome/pro-regular-svg-icons/faFileUpload';
import { faFolderUpload } from '@fortawesome/pro-regular-svg-icons/faFolderUpload';
import { faFolderPlus } from '@fortawesome/pro-regular-svg-icons/faFolderPlus';
import { faFileAlt } from '@fortawesome/pro-regular-svg-icons/faFileAlt';
import { faPresentation } from '@fortawesome/pro-regular-svg-icons/faPresentation';
import { faTable } from '@fortawesome/pro-regular-svg-icons/faTable';
import Divider from '@material-ui/core/Divider';
import { useTranslation } from 'react-i18next';

import Option from './components/Option';
import CreateNewMenu from './index';

const categoryName = 'ElementalComponents';

const { PUBLIC_URL } = process.env;

storiesOf(categoryName, module).add('CreateNewMenu', () => {
  const [menuOpen, setMenuOpen] = useState(true) 

  const { t } = useTranslation();

  const defaultProps = {
    items: [
      {
        id: 'file-upload',
        label: t('createNewMenu.fileUpload'),
        component: Option,
        icon: faFileUpload,
        onClick: () => console.log('upload file'),
      },
      {
        id: 'folder-upload',
        label: t('createNewMenu.folderUpload'),
        component: Option,
        icon: faFolderUpload,
        onClick: () => console.log('upload folder'),
      },
      {
        component: Divider,
      },
      {
        id: 'add-folder',
        label: t('createNewMenu.folder'),
        component: Option,
        icon: faFolderPlus,
        onClick: () => console.log('add folder'),
      },
      {
        component: Divider,
      },
      {
        id: 'text-doc',
        label: t('createNewMenu.textDoc'),
        component: Option,
        icon: faFileAlt,
        subItems: [
          {
            id: 'google-doc',
            label: t('createNewMenu.googleDoc'),
            component: Option,
            img: `${PUBLIC_URL}/assets/icons/google-doc.png`,
            width: 10,
            height: 14,
            onClick: () => console.log('create google doc'),
          },
          {
            id: 'word',
            label: t('createNewMenu.word'),
            component: Option,
            img: `${PUBLIC_URL}/assets/icons/word.png`,
            width: 12,
            height: 12,
            onClick: () => console.log('create word doc'),
          },
          {
            id: 'text-edit',
            label: t('createNewMenu.textEdit'),
            component: Option,
            img: `${PUBLIC_URL}/assets/icons/textedit.png`,
            width: 15,
            height: 15,
            onClick: () => console.log('create text'),
          },
        ]
      },
      {
        id: 'presentation',
        label: t('createNewMenu.presentation'),
        component: Option,
        icon: faPresentation,
        subItems: [
          {
            id: 'google-slide',
            label: t('createNewMenu.googleSlide'),
            component: Option,
            img: `${PUBLIC_URL}/assets/icons/google-slide.png`,
            width: 16,
            height: 16,
            onClick: () => console.log('create google slides'),
          },
          {
            id: 'powerpoint',
            label: t('createNewMenu.powerpoint'),
            component: Option,
            img: `${PUBLIC_URL}/assets/icons/powerpoint.png`,
            width: 12,
            height: 12,
            onClick: () => console.log('create powerpoint'),
          },
          {
            id: 'keynote',
            label: t('createNewMenu.keynote'),
            component: Option,
            img: `${PUBLIC_URL}/assets/icons/keynote.png`,
            width: 14,
            height: 14,
            onClick: () => console.log('create keynote'),
          },
        ],
      },
      {
        id: 'sheets',
        label: t('createNewMenu.sheets'),
        component: Option,
        icon: faTable,
        placement: 'right-end',
        subItems: [
          {
            id: 'google-sheet',
            label: t('createNewMenu.googleSheet'),
            component: Option,
            img: `${PUBLIC_URL}/assets/icons/google-sheet.png`,
            width: 16,
            height: 16,
            onClick: () => console.log('create google sheets'),
          },
          {
            id: 'excel',
            label: t('createNewMenu.excel'),
            component: Option,
            img: `${PUBLIC_URL}/assets/icons/excel.png`,
            width: 12,
            height: 12,
            onClick: () => console.log('create excel'),
          },
          {
            id: 'number',
            label: t('createNewMenu.numbers'),
            component: Option,
            img: `${PUBLIC_URL}/assets/icons/numbers.png`,
            width: 14,
            height: 14,
            onClick: () => console.log('create numbers'),
          },
        ],
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
