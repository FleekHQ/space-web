import React from 'react';
import { storiesOf } from '@storybook/react';
import { select, object, number } from '@storybook/addon-knobs';

import AvatarsList from './index';

const categoryName = 'AvatarsList';

storiesOf(categoryName, module).add('AvatarsList', () => {

  const defaultProps = {
    size: select('size', ['small', 'normal'], 'normal'),
    maxVisible: number('maxVisible', 5),
    usersList: object('usersList', [
      {
        imgUrl: '',
        username: 'Human',
        address: '0xa928405a2a980f58737aa913553c8d6ea1ab',
        publicKey: '81130b6639166ead5911d71304854daddb1fe98a396551a4be01de65da01f3a9',
        isOwner: false,
      },
      {
        imgUrl: 'https://i.pinimg.com/originals/76/37/47/763747c1de6a8c33cecef121a3df0bb0.jpg',
        username: 'Dog',
        address: '0xa918f05a2a980f58737aa913553c8d6ea1ab',
        publicKey: '81130a6678566ead5911d71304854daddb1fe98a396551a4be01de65da01f3a9',
        isOwner: false,
      },
      {
        address: '0xd606f05a2a980f58737aa913553c8d6eac8b',
        publicKey: '67730a6678566ead5911d71304854daddb1fe98a396551a4be01de65da01f3a9',
        username: 'Cat',
        isOwner: false,
      },
      {
        address: '0xd606f05a2a980235737aa913553c8d6eac8b',
        publicKey: '67730a6678566ead5911d71304854daddb1fe98a396551a4be01de65da01f3a9',
        username: 'AAA',
        isOwner: false,
      },
      {
        address: '0xd606f05a2a980f58737aa913536c8d6eac8b',
        publicKey: '67730a6678566ead5911d71304854daddb1fe98a396551a4be01de65da01f3a9',
        username: 'BBB',
        isOwner: false,
      },
      {
        address: '0xd603f05a2a980f58737aa913553c8d6eac8b',
        publicKey: '67730a6678566ead5911d71304854daddb1fe98a396551a4be01de65da01f3a9',
        username: 'CCC',
        isOwner: false,
      },
    ]),
  };

  return (
    <div
      style={{
        width: 500,
        height: 150,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#eeeeee',
      }}
    >
      <AvatarsList {...defaultProps} />
    </div>
  );
});