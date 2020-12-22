/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import moment from 'moment';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom';
import Typography from '@material-ui/core/Typography';
import { useTranslation } from 'react-i18next';
import { TableCell, FileNameCell, TableRow } from '@ui/Table';
import { formatBytes, getTabulations, useDoubleClick } from '@utils';
import getHoverMenuItems from '@shared/components/ObjectsTable/utils/get-hover-menu';
import hoverMenuItemOnClick from '@shared/components/ObjectsTable/utils/hover-menu-on-click';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle } from '@fortawesome/pro-solid-svg-icons/faCheckCircle';
import { faExclamationCircle } from '@fortawesome/pro-solid-svg-icons/faExclamationCircle';
import { faSpinnerThird } from '@fortawesome/pro-duotone-svg-icons/faSpinnerThird';
import HoverMenu from '@ui/HoverMenu';

import useStyles from './styles';

const RenderRow = ({
  row,
  arrowOnClick,
  disableOffset,
  rowIndex,
  handleRowClick,
  handleRowRightClick,
  handleDoubleRowClick,
  rowClasses,
}) => {
  const dispatch = useDispatch();
  const location = useLocation();
  const classes = useStyles({ progress: 0.4, rowIndex });
  const { t } = useTranslation();

  const rowDoubleClickHandler = handleDoubleRowClick({ row });

  const onClick = useDoubleClick({
    singleClick: handleRowClick({ rowIndex }),
    doubleClick: rowDoubleClickHandler,
  });

  const getSizeIcon = () => {
    if (row.isUploading) {
      if (row.error) {
        return (
          <div className={classes.iconContainer}>
            <FontAwesomeIcon
              icon={faExclamationCircle}
              className={classes.errorIcon}
            />
          </div>
        );
      }
      return (
        <div className={classes.iconContainer}>
          <FontAwesomeIcon
            spin
            icon={faSpinnerThird}
            className={classes.uploadingIcon}
          />
        </div>
      );
    }
    if (row.ext === 'folder') return <div className={classes.iconContainer} />;
    if (row.isAvailableInSpace) {
      return (
        <div className={classes.iconContainer}>
          <FontAwesomeIcon
            icon={faCheckCircle}
            className={classnames(classes.checkIcon, {
              [classes.notAvailableLocally]: !row.isLocallyAvailable,
            })}
          />
        </div>
      );
    }
    return (
      <div className={classes.iconContainer}>
        <FontAwesomeIcon
          spin
          icon={faSpinnerThird}
          className={classes.loadingIcon}
        />
      </div>
    );
  };

  const getLastModifiedCell = () => {
    if (row.isUploading) {
      if (row.error) {
        return (
          <Typography className={classes.errorText}>
            {t('modules.storage.fileTable.uploadFailed')}
          </Typography>
        );
      }
      return (
        <div className={classes.progressBar} />
      );
    }
    return (
      <Typography variant="body1" color="secondary" noWrap>
        {moment(row.lastModified).format('MMM D, YYYY')}
        {/* ^ just for testing, after POC should be used line below */}
        {/* {formatMonthDayYear(row.lastModified)} */}
      </Typography>
    );
  };

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
      onContextMenu={handleRowRightClick({ row })}
      onClick={onClick}
      component={
        ({ children, ...rowProps }) => (
          <tr
            {...rowProps}
            className={[rowProps.className, classes.rowWrapper].join(' ')}
          >
            {children}
            {row.isUploading && (
              <div className={classes.tooltip}>
                <HoverMenu
                  i18n={{
                    retry: t('hoverMenu.retry'),
                    cancel: t('hoverMenu.cancel'),
                  }}
                  items={getHoverMenuItems(row)}
                  menuItemOnClick={hoverMenuItemOnClick(row, dispatch)}
                />
              </div>
            )}
          </tr>
        )
      }
    >
      <FileNameCell
        ext={row.ext}
        src={`file:${row.key}`}
        arrowOnClick={arrowOnClick}
        expanded={row.expanded}
        tabulations={disableOffset ? 0 : getTabulations(row.key, location)}
        name={row.name}
        selected={!!row.selected}
        isShared={row.members.length > 1}
        isUploading={row.isUploading}
        onNameClick={rowDoubleClickHandler}
      />
      <TableCell className={classes.iconSizeContainer}>
        {getSizeIcon()}
        <Typography
          variant="body1"
          color="secondary"
          noWrap
          className={classnames({
            [classes.uploading]: row.isUploading,
          })}
        >
          {formatBytes(row.size)}
        </Typography>
      </TableCell>
      <TableCell>
        {getLastModifiedCell()}
      </TableCell>
    </TableRow>
  );
};

RenderRow.defaultProps = {
  arrowOnClick: () => {},
  disableOffset: false,
};

RenderRow.propTypes = {
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
  disableOffset: PropTypes.bool,
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

export default RenderRow;
