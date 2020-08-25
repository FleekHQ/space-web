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

import { renderRow } from '../../renderRow';
import getTableHeads from '../../getTableHeads';

const FileTable = ({
  bucket,
  prefix,
  baseRedirectUrl,
}) => {
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const [rows, isSharingModalVisible] = useSelector((state) => [
    objectsSelector(
      state,
      bucket,
      prefix,
      '/',
    ),
    state.modals.some((modal) => modal.type === SHARING_MODAL),
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

  const onDropzoneDrop = (files) => {
    addItems({
      targetPath: prefix,
      sourcePaths: files.map((file) => file.path),
    });
  };

  return (
    <ObjectsTable
      rows={rows}
      bucket={bucket}
      renderRow={renderRow}
      heads={getTableHeads(t)}
      getRedirectUrl={(row) => path.join(baseRedirectUrl, prefix, row.name)}
      onDropzoneDrop={onDropzoneDrop}
      onOutsideClick={handleTableOutsideClick}
    />
  );
};

FileTable.defaultProps = {
  baseRedirectUrl: '/storage/files',
};

FileTable.propTypes = {
  bucket: PropTypes.string.isRequired,
  prefix: PropTypes.string.isRequired,
  baseRedirectUrl: PropTypes.string,
};

export default FileTable;
