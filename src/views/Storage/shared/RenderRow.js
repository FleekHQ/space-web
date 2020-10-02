import React from 'react';
import moment from 'moment';
import PropTypes from 'prop-types';
import { formatBytes } from '@utils';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import Typography from '@material-ui/core/Typography';
import { TableCell, FileCell, IconsCell } from '@ui/Table';
import { openModal, LICENSE_REGISTRATION } from '@shared/components/Modal/actions';

const RenderRow = ({ row }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const shareAmount = row.shareAmount - 1;
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
            dispatch(openModal(LICENSE_REGISTRATION));
          }}
          i18n={iconsCellI18n}
        />
      </TableCell>
    </>
  );
};

RenderRow.propTypes = {
  row: PropTypes.shape({
    shareAmount: PropTypes.number,
    ext: PropTypes.string,
    key: PropTypes.string,
    name: PropTypes.string,
    size: PropTypes.number,
    lastModified: PropTypes.instanceOf(Date),
    isLocallyAvailable: PropTypes.bool,
    isAvailableInSpace: PropTypes.bool,
  }).isRequired,
};

export default RenderRow;
