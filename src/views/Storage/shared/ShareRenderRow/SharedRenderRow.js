/* eslint-disable react/jsx-props-no-spreading */
import React, { useEffect } from 'react';
import classnames from 'classnames';
import get from 'lodash/get';
import moment from 'moment';
import PropTypes from 'prop-types';
import { getTabulations, useDoubleClick } from '@utils';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Typography from '@material-ui/core/Typography';
import {
  TableCell,
  FileNameCell,
  MemberCell,
  TableRow,
} from '@ui/Table';
import { getIdentitiesByAddress } from '@events/identities';
import getHoverMenuItems from '@shared/components/ObjectsTable/utils/get-hover-menu';
import hoverMenuItemOnClick from '@shared/components/ObjectsTable/utils/hover-menu-on-click';
import HoverMenu from '@ui/HoverMenu';
import Tooltip from '@material-ui/core/Tooltip';

import useStyles from './styles';

const ShareRenderRow = ({
  row,
  arrowOnClick,
  rowIndex,
  handleRowClick,
  handleRowRightClick,
  handleDoubleRowClick,
  rowClasses,
}) => {
  const location = useLocation();
  const members = get(row, 'members', []) || [];
  const [userAddress, identities] = useSelector((state) => [state.user.address, state.identities]);
  const classes = useStyles({ progress: 0.4, rowIndex });
  const { t } = useTranslation();

  const firstMember = members.find((item) => item.address !== userAddress);
  const firstMemberIdentity = get(identities, `identities.${firstMember.publicKey}`, {});

  useEffect(() => {
    if (!firstMemberIdentity.username) {
      getIdentitiesByAddress({
        addresses: [firstMember.address],
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
      component={
        ({ children, ...rowProps }) => (
          <Tooltip
            interactive
            classes={{
              tooltip: classes.tooltipRoot,
              popper: classes.popperRoot,
            }}
            title={(
              <HoverMenu
                i18n={{
                  retry: t('hoverMenu.retry'),
                  cancel: t('hoverMenu.cancel'),
                }}
                items={getHoverMenuItems(row)}
                menuItemOnClick={hoverMenuItemOnClick}
              />
            )}
          >
            <tr {...rowProps}>
              {children}
            </tr>
          </Tooltip>
        )
      }
    >
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
    </TableRow>
  );
};

ShareRenderRow.defaultProps = {
  arrowOnClick: () => {},
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
};

export default ShareRenderRow;
