import React from 'react';
import { storiesOf } from '@storybook/react';
import { object } from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';

import CollaboratorList from './index';

const categoryName = 'SharingModal.Components';

storiesOf(categoryName, module).add('CollaboratorList', () => {
  const defaultProps = {
    onChangePermissions: action('onChangePermissions'),
    collaborators: object('collaborators', [
      {
        id: 'morochroyce@gmail.com',
        mainText: 'Peter Adams',
        secondaryText: 'morochroyce@gmail.com',
        imageSrc: 'https://cdn.theatlantic.com/thumbor/55coU3IJRzsQ16uvkFvYoLl3Pkc=/200x200/filters:format(png)/media/None/image/original.png',
        permissionsId: 'edit',
        isOwner: true,
      },
      {
        id: 'morochgfx@gmail.com',
        mainText: 'morochgfx@gmail.com',
        secondaryText: 'Outside of Team',
        permissionsId: 'edit',
      },
      {
        id: 'maria.mart@gmail.com',
        mainText: 'Maria Martinez',
        secondaryText: 'maria.mart@gmail.com',
        imageSrc: 'https://aboutfaceskincare.com/wp-content/uploads/2019/11/About-Face-Skincare1172_pp-1-e1574785727292.jpg',
        permissionsId: 'edit',
      },
    ]),
    options: object('options', [
      {
        id: 'edit',
        selected: true,
        title: 'Can edit',
        description: 'Members can edit, delete, and add the file to their Space.',
      },
      // {
      //   id: 'view',
      //   selected: false,
      //   title: 'Can view',
      //   description: 'Members can view and download.',
      // },
      {
        id: 'remove',
        title: 'Remove',
        danger: true,
      },
    ]),
    i18n: object('i18n', {
      owner: 'Owner',
    }),
  };

  return (
    <CollaboratorList {...defaultProps} />
  );
});
