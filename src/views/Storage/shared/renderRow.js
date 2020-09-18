import React from 'react';
import moment from 'moment';
import Typography from '@material-ui/core/Typography';
import { formatBytes } from '@utils';
import { TableCell, FileCell, IconsCell } from '@ui/Table';
import { openModal, SETTINGS_MODAL } from '@shared/components/Modal/actions';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';

// eslint-disable-next-line import/prefer-default-export
export const renderRow = (row) => {
  const shareAmount = row.shareAmount - 1;

  const { t } = useTranslation();
  const dispatch = useDispatch();

  const iconsCellI18n = {
    warning: t('modules.storage.fileTable.storageLimitReached.warning'),
    description: t('modules.storage.fileTable.storageLimitReached.description'),
    button: t('modules.storage.fileTable.storageLimitReached.button'),
  };

  return (
    <>
      <FileCell ext={row.ext} src={`file:${row.key}`}>
        <Typography variant="body1" noWrap>
          {row.name}
        </Typography>
      </FileCell>
      <TableCell>
        <Typography variant="body1" color="secondary" noWrap>
          {formatBytes(row.size)}
        </Typography>
      </TableCell>
      <TableCell>
        <Typography variant="body1" color="secondary" noWrap>
          {moment(row.lastModified).format('MMM d, YYYY hh:mm:ss A z')}
          {/* ^ just for testing, after POC should be used line below */}
          {/* {formatMonthDayYear(row.lastModified)} */}
        </Typography>
      </TableCell>
      <TableCell>
        <IconsCell
          localStorageActive={row.isLocallyAvailable}
          spaceStorageActive={row.isAvailableInSpace}
          sharedCount={shareAmount < 0 ? 0 : shareAmount}
          storageLimitWarning={false}
          upgradeOnClick={(e) => {
            e.stopPropagation();
            dispatch(openModal(SETTINGS_MODAL));
          }}
          i18n={iconsCellI18n}
        />
      </TableCell>
    </>
  );
};
