import React from 'react';
import path from 'path';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { useSelector, useDispatch } from 'react-redux';

import { addItems } from '@events';
import { objectsSelector } from '@utils';
import { UPDATE_OBJECTS } from '@reducers/storage';
import ObjectsTable from '@shared/components/ObjectsTable';
import { SHARING_MODAL } from '@shared/components/Modal/actions';

import RenderRow from '../../RenderRow';
import getTableHeads from '../../getTableHeads';
import renderLoadingRows from '../../render-loading-rows';

const FileTable = ({
  type,
  bucket,
  prefix,
  fetchDir,
  renderRow,
  EmptyState,
  baseRedirectUrl,
  disableRowOffset,
}) => {
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const [rows, isSharingModalVisible, loading] = useSelector((state) => [
    objectsSelector(
      state,
      bucket,
      prefix,
      '/',
      true,
    ),
    state.modals.some((modal) => modal.type === SHARING_MODAL),
    state.storage.buckets[bucket].loading,
    state.storage,
  ]);

  const handleTableOutsideClick = (target) => {
    // avoid unselecting if user interact with detail panel
    const detailsPanel = document.getElementById('storage-detail-panel');
    const clickedInDetailsPanel = detailsPanel && detailsPanel.contains(target);
    const hasRowSelected = rows.find((row) => row.selected);

    if (isSharingModalVisible || clickedInDetailsPanel || !hasRowSelected) {
      return;
    }

    dispatch({
      type: UPDATE_OBJECTS,
      payload: rows.map((_row) => ({
        ..._row,
        pivote: false,
        selected: false,
      })),
      bucket,
    });
  };

  const onDropzoneDrop = (files, target) => {
    addItems({
      targetPath: target || prefix,
      sourcePaths: files.map((file) => file.path),
    });
  };

  const getRedirectUrl = (row) => {
    const folderPath = row.key.replace(prefix, '');
    return path.posix.join(baseRedirectUrl, prefix, folderPath);
  };

  return (
    <ObjectsTable
      rows={rows}
      bucket={bucket}
      loading={rows.length <= 0 && loading}
      renderLoadingRows={renderLoadingRows}
      renderRow={renderRow}
      heads={getTableHeads(t, type)}
      getRedirectUrl={getRedirectUrl}
      onDropzoneDrop={onDropzoneDrop}
      onOutsideClick={handleTableOutsideClick}
      EmptyState={EmptyState}
      fetchDir={fetchDir}
      disableRowOffset={disableRowOffset}
      withRowOptions={false}
    />
  );
};

FileTable.defaultProps = {
  fetchDir: () => null,
  renderRow: RenderRow,
  EmptyState: () => null,
  disableRowOffset: false,
  baseRedirectUrl: '/storage/files',
  type: 'personal',
};

FileTable.propTypes = {
  fetchDir: PropTypes.func,
  renderRow: PropTypes.elementType,
  EmptyState: PropTypes.elementType,
  disableRowOffset: PropTypes.bool,
  baseRedirectUrl: PropTypes.string,
  bucket: PropTypes.string.isRequired,
  prefix: PropTypes.string.isRequired,
  type: PropTypes.oneOf(['personal', 'shared']),
};

export default FileTable;
