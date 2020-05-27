import React from 'react';
import { storiesOf } from '@storybook/react';
import { text, object } from '@storybook/addon-knobs';

import TeamSelector from './index';

const categoryName = 'TeamSelector';

storiesOf(categoryName, module).add('TeamSelector', () => {

  const props = {
    selectedAccountId: text('selectedAccountId', '1'),
    accountsList: object('accountsList', [
      {
        id: '1',
        name: 'Team Name',
        membersNumber: 1,
        photoUrl: '',
      },
      {
        id: '2',
        name: 'Chewbacca Team',
        membersNumber: 2,
        photoUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQsnU3GZ4oaDHmWLWNWbRrAcZzIjMB7hIDrkfg_j54CM5wFI4wq&usqp=CAU',
      },
      {
        id: '3',
        name: 'Really Very Long Team Name',
        membersNumber: 1024,
        photoUrl: '',
      },
    ]),
  };

  return (
    <div style={{ backgroundColor: '#f2f3f7', width: 200 }}>
      <TeamSelector {...props} />
    </div>
  );
});
