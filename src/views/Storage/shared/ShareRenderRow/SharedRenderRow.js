import React, { useEffect } from 'react';
import get from 'lodash/get';
import moment from 'moment';
import PropTypes from 'prop-types';
import { getTabulations } from '@utils';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import Typography from '@material-ui/core/Typography';
import { TableCell, FileNameCell, MemberCell } from '@ui/Table';
import { getIdentitiesByAddress } from '@events/identities';

const ShareRenderRow = ({ row, arrowOnClick }) => {
  const location = useLocation();
  const members = get(row, 'members', []) || [];
  const [userAddress, identities] = useSelector((state) => [state.user.address, state.identities]);

  const firstMember = members.find((item) => item.address !== userAddress);
  const firstMemberIdentity = get(identities, `identities.${firstMember.publicKey}`, {});

  useEffect(() => {
    if (!firstMemberIdentity.username) {
      getIdentitiesByAddress({
        addresses: [firstMember.address],
      });
    }
  }, []);

  return (
    <>
      <FileNameCell
        ext={row.ext}
        src={`file:${row.key}`}
        arrowOnClick={arrowOnClick}
        expanded={row.expanded}
        tabulations={getTabulations(row.key, location)}
        name={row.name}
        selected={!!row.selected}
        isShared={row.members.length > 0}
      />
      <MemberCell
        username={firstMemberIdentity.username}
        avatarUrl={firstMemberIdentity.avatarUrl}
      />
      <TableCell>
        <Typography variant="body1" color="secondary" noWrap>
          {moment(row.lastModified).format('MMM D, YYYY')}
          {/* ^ just for testing, after POC should be used line below */}
          {/* {formatMonthDayYear(row.lastModified)} */}
        </Typography>
      </TableCell>
    </>
  );
};

ShareRenderRow.defaultProps = {
  arrowOnClick: () => {},
};

ShareRenderRow.propTypes = {
  row: PropTypes.shape({
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
  }).isRequired,
  arrowOnClick: PropTypes.func,
};

export default ShareRenderRow;
