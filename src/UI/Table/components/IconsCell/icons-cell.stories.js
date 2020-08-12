import React from 'react';
import { storiesOf } from '@storybook/react';
import Table from '@material-ui/core/Table';
import { boolean, number } from '@storybook/addon-knobs';

import IconsRow from './index';
import TableRow from '../TableRow';

const categoryName = 'ElementalComponents/Table';

storiesOf(categoryName, module).add('IconsRow', () => {
  const defaultProps = {
    localStorageActive: boolean('localStorageActive', true),
    spaceStorageActive: boolean('spaceStorageActive', true),
    sharedCount: number('sharedCount', 2),
  };

  return (
    <Table>
      <TableRow>
        <IconsRow {...defaultProps} />
      </TableRow>
    </Table>
  );
});
