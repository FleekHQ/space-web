/* eslint-disable react/jsx-props-no-spreading */
import React, { useEffect } from 'react';
import classnames from 'classnames';
import get from 'lodash/get';
import moment from 'moment';
import PropTypes from 'prop-types';
import { getTabulations, useDoubleClick } from '@utils';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import Typography from '@material-ui/core/Typography';
import {
  TableCell,
  FileNameCell,
  MemberCell,
  TableRow,
} from '@ui/Table';
import { getIdentitiesByAddress } from '@events/identities';

const ShareRenderRow = ({
  row,
  arrowOnClick,
  rowIndex,
  handleRowClick,
  handleRowRightClick,
  handleDoubleRowClick,
  rowClasses,
  disableOffset,
}) => {
  const location = useLocation();
  const members = get(row, 'members', []) || [];
  const [userPubKey, identities] = useSelector((state) => [
    state.user.publicKey,
    state.identities,
  ]);

  const sharedByPubKey = get(row, 'sharedBy', userPubKey) || userPubKey;
  const sharedByIdentity = get(identities, `identities.${sharedByPubKey}`, {});

  useEffect(() => {
    if (!sharedByIdentity.username) {
      const member = members.find((item) => item.publicKey === sharedByPubKey);

      getIdentitiesByAddress({
        addresses: [get(member, 'address', '')],
      });
    }
  }, []);

  const onClick = useDoubleClick({
    singleClick: handleRowClick({ rowIndex }),
    doubleClick: handleDoubleRowClick({ row }),
  });

  return (
    <TableRow
      hover
      key={row.id}
      data-key={row.fullKey}
      className={classnames(rowClasses.row, {
        [rowClasses.selectedAndUploading]: (
          (row.isUploading && row.selected)
        ),
        [rowClasses.selected]: row.selected,
        [rowClasses.error]: row.error && !row.isUploading,
      })}
      onClick={onClick}
      onContextMenu={handleRowRightClick({ row })}
    >
      <FileNameCell
        ext={row.ext}
        src={`file:${row.key}`}
        arrowOnClick={arrowOnClick}
        expanded={row.expanded}
        tabulations={disableOffset ? 0 : getTabulations(row.key, location)}
        name={row.name}
        selected={!!row.selected}
        isShared={row.members.length > 0}
      />
      <MemberCell
        username={sharedByIdentity.displayName}
        avatarUrl={sharedByIdentity.avatarUrl}
      />
      <TableCell>
        <Typography variant="body1" color="secondary" noWrap>
          {moment(row.lastModified).format('MMM D, YYYY')}
          {/* ^ just for testing, after POC should be used line below */}
          {/* {formatMonthDayYear(row.lastModified)} */}
        </Typography>
      </TableCell>
    </TableRow>
  );
};

ShareRenderRow.defaultProps = {
  arrowOnClick: () => {},
  disableOffset: false,
};

ShareRenderRow.propTypes = {
  row: PropTypes.shape({
    id: PropTypes.string,
    fullKey: PropTypes.string,
    shareAmount: PropTypes.number,
    ext: PropTypes.string,
    key: PropTypes.string,
    name: PropTypes.string,
    size: PropTypes.number,
    lastModified: PropTypes.instanceOf(Date),
    isLocallyAvailable: PropTypes.bool,
    isAvailableInSpace: PropTypes.bool,
    expanded: PropTypes.bool,
    selected: PropTypes.bool,
    members: PropTypes.array,
    isUploading: PropTypes.bool,
    error: PropTypes.bool,
  }).isRequired,
  arrowOnClick: PropTypes.func,
  rowIndex: PropTypes.number.isRequired,
  handleRowClick: PropTypes.func.isRequired,
  handleRowRightClick: PropTypes.func.isRequired,
  handleDoubleRowClick: PropTypes.func.isRequired,
  rowClasses: PropTypes.shape({
    row: PropTypes.string,
    selected: PropTypes.string,
    selectedAndUploading: PropTypes.string,
    error: PropTypes.string,
  }).isRequired,
  disableOffset: PropTypes.bool,
};

export default ShareRenderRow;
