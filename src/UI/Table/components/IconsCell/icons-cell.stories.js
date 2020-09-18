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
    storageLimitWarning: boolean('storageLimitWarning', true),
    i18n: {
      warning: "Backup Limit Reached",
      description: "This file is not backed up, upgrade to Space Pro to back up this file.",
      button: "Upgrade to Space Pro",
    },
  };

  return (
    <div style={{ padding: 20 }}>
      <Table>
        <TableRow>
          <IconsRow {...defaultProps} />
        </TableRow>
      </Table>
    </div>
  );
});
