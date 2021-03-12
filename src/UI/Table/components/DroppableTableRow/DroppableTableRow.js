import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import { useDrop } from 'react-dnd';
import uniqBy from 'lodash/uniqBy';

import { MOVE_OBJECTS } from '@reducers/storage';
import MuiTableRow from '@material-ui/core/TableRow';
import RootRef from '@material-ui/core/RootRef';
import { useRainbowRowDispatch } from '@shared/utils/rainbow-row-context';
import { listDirectory, moveObjects } from '@events/objects';
import { MOVE_TYPES } from '@reducers/details-panel/move';
import { openModal, MOVE_PROGRESS_TOAST } from '@shared/components/Modal/actions';

import {
  moveFiles,
  populateWithSelected,
  getSourceAndDestinationArrays,
  getFolderKeys,
  getFileCount,
} from '@utils/move-files';

const DroppableTableRow = (props) => {
  const {
    arrowOnClick,
    rowKey,
    bucket,
    rowIndex,
  } = props;
  const dispatch = useDispatch();
  const [arrowTimeoutID, setArrowTimeoutID] = useState(false);
  const dispatchRainbow = useRainbowRowDispatch();

  const objects = useSelector((state) => (
    state.storage.buckets[bucket].objects
  ));

  const canDrop = (Props, monitor) => {
    const { rowKey: droppedKey } = monitor.getItem();

    const getParents = (key) => {
      const parents = key.split('/');
      parents.pop();

      return parents;
    };

    const currentParents = getParents(rowKey);
    const droppedParents = getParents(droppedKey);

    const sameRow = droppedKey === rowKey;
    const moveParentToChild = currentParents.includes(droppedKey);
    const moveToCurrentFolder = droppedParents.join('/') === rowKey;

    return (!sameRow && !moveParentToChild && !moveToCurrentFolder);
  };

  const drop = (Props, monitor) => {
    const { rowKey: droppedKey } = monitor.getItem();

    dispatchRainbow({ type: 'remove', rowIndex });

    const notificationId = `${new Date().getTime()}`;

    dispatch({
      type: MOVE_TYPES.ON_MOVE_FILES,
      payload: {
        id: notificationId,
      },
    });
    dispatch(openModal(MOVE_PROGRESS_TOAST, { notificationId }));

    let sources = populateWithSelected({ objects, objectKey: droppedKey, targetKey: rowKey });
    const folderKeys = getFolderKeys(objects, sources);

    let updatedObjects = [...objects];
    Promise.all(folderKeys.map((path) => listDirectory(path, bucket, true, true)))
      .then((fetchedItems) => {
        if (!fetchedItems) {
          dispatch({
            type: MOVE_TYPES.ON_MOVE_FILES_ERROR,
            payload: {
              notificationId,
              error: 'error-reading-files',
            },
          });

          return [Promise.resolve(false)];
        }

        const flatFetchedItems = fetchedItems.flat();
        updatedObjects = updatedObjects.concat(...flatFetchedItems);

        const fetchedKeys = flatFetchedItems.map((item) => item.key);

        sources = sources.concat(...fetchedKeys);

        const objectsToMove = moveFiles({
          objects,
          sources,
          target: rowKey,
          bucket,
        });

        const uniqObjectsToMove = uniqBy(objectsToMove, 'key');
        const fileCount = getFileCount(uniqObjectsToMove);

        dispatch({
          type: MOVE_TYPES.ON_MOVE_FILES_LOADING,
          payload: {
            notificationId,
            fileCount,
          },
        });

        const [sourceArr, destArr] = getSourceAndDestinationArrays(uniqObjectsToMove);

        const moveSuccess = moveObjects({
          bucket,
          notificationId,
          sourceArr,
          destArr,
        });

        return Promise.all([moveSuccess, Promise.resolve(uniqObjectsToMove)]);
      })
      .then(([moveSuccess, uniqObjectsToMove]) => {
        if (moveSuccess) {
          dispatch({
            type: MOVE_OBJECTS,
            payload: uniqObjectsToMove,
            bucket,
          });
        }
      });
  };

  const [{ isOver, canDropValue }, dropRef] = useDrop(() => ({
    accept: ['file', 'folder'],
    canDrop,
    drop,
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
      canDropValue: !!monitor.canDrop(),
    }),
  }), [objects]);

  useEffect(() => {
    if (isOver && canDropValue) {
      setTimeout(() => {
        dispatchRainbow({ type: 'add', rowIndex });
      }, 15);
    }

    const timeoutID = setTimeout(() => {
      if (isOver && canDropValue) {
        arrowOnClick();
      }
    }, 1000);

    setArrowTimeoutID(timeoutID);

    if (!isOver) {
      // To ensure smooth animation
      setTimeout(() => {
        dispatchRainbow({ type: 'remove', rowIndex });
      }, 5);

      if (arrowTimeoutID) {
        clearTimeout(arrowTimeoutID);
      }
    }
  }, [isOver]);

  return (
    <RootRef rootRef={dropRef}>
      <MuiTableRow
        // eslint-disable-next-line react/jsx-props-no-spreading
        {...props}
      />
    </RootRef>
  );
};

DroppableTableRow.propTypes = {
  rowKey: PropTypes.string.isRequired,
  bucket: PropTypes.string.isRequired,
  rowIndex: PropTypes.number.isRequired,
  arrowOnClick: PropTypes.func.isRequired,
};

export default DroppableTableRow;
