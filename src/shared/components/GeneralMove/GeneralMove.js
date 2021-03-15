import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useDrop } from 'react-dnd';
import uniqBy from 'lodash/uniqBy';
import { useSelector, useDispatch } from 'react-redux';

import { listDirectory, moveObjects } from '@events/objects';
import { MOVE_OBJECTS } from '@reducers/storage';
import { MOVE_TYPES } from '@reducers/details-panel/move';
import { openModal, MOVE_PROGRESS_TOAST } from '@shared/components/Modal/actions';

import RootRef from '@material-ui/core/RootRef';
import {
  useRainbowRowDispatch,
} from '@shared/utils/rainbow-row-context';
import {
  moveFiles,
  populateWithSelected,
  getSourceAndDestinationArrays,
  getFolderKeys,
  getFileCount,
} from '@utils/move-files';

const GeneralMove = ({ children }) => {
  const ROW_INDEX = -1;
  const ROW_KEY = '';
  const BUCKET = 'personal';

  const dispatch = useDispatch();
  const dispatchRainbow = useRainbowRowDispatch();
  const objects = useSelector((state) => (
    state.storage.buckets[BUCKET].objects
  ));

  const canDrop = (Props, monitor) => {
    const { rowKey: droppedKey } = monitor.getItem();

    const getParents = (key) => {
      const parents = key.split('/');
      parents.pop();

      return parents;
    };

    const droppedParents = getParents(droppedKey);

    const moveToCurrentFolder = droppedParents.join('/') === ROW_KEY;

    return !moveToCurrentFolder;
  };

  const drop = (Props, monitor) => {
    if (monitor.didDrop()) {
      return;
    }

    const { rowKey: droppedKey } = monitor.getItem();

    const notificationId = `${new Date().getTime()}`;

    dispatch({
      type: MOVE_TYPES.ON_MOVE_FILES,
      payload: {
        id: notificationId,
      },
    });
    dispatch(openModal(MOVE_PROGRESS_TOAST, { notificationId }));

    let sources = populateWithSelected({ objects, objectKey: droppedKey, targetKey: ROW_KEY });
    const folderKeys = getFolderKeys(objects, sources);

    let updatedObjects = [...objects];

    Promise.all(folderKeys.map((path) => listDirectory(path, BUCKET, true, true)))
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
          target: ROW_KEY,
          bucket: BUCKET,
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
          bucket: BUCKET,
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
            bucket: BUCKET,
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
      dispatchRainbow({ type: 'addDefault', rowIndex: ROW_INDEX });
    }

    if (!isOver) {
      dispatchRainbow({ type: 'removeDefault' });
      dispatchRainbow({ type: 'remove', rowIndex: ROW_INDEX });
    }
  }, [isOver]);

  return (
    <RootRef rootRef={dropRef}>
      { children }
    </RootRef>
  );
};

GeneralMove.propTypes = {
  children: PropTypes.node.isRequired,
};

export default GeneralMove;
