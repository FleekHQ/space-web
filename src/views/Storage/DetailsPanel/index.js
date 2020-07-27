import React from 'react';
import get from 'lodash/get';
import { useSelector, useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { matchPath, useLocation } from 'react-router-dom';

import { objectsSelector } from '@utils';
import { openModal, SHARING_MODAL } from '@shared/components/Modal/actions';
import DetailsPanel, {
  Empty,
  Header,
  Divider,
  SharePanel,
  AvatarHeader,
  ObjectDetails,
} from '@shared/components/DetailsPanel';

import { OBJECT_TYPES } from './constants';

const StorageDetailsPanel = () => {
  const { t } = useTranslation();
  const location = useLocation();
  const dispatch = useDispatch();
  const { user, objectsType, selectedObjects } = useSelector((state) => {
    let prefix;
    let bucket;

    const filesMatch = matchPath(location.pathname, { path: '/storage/files/*' });
    const sharedMatch = matchPath(location.pathname, { path: '/storage/shared-by', exact: true });
    const sharedBucketMatch = matchPath(location.pathname, { path: '/storage/shared-by/:bucket/*' });

    if (sharedMatch) {
      // TODO: check if this is the correct way to get a selected bucket
      const bucketKeySelected = Object.keys(state.storage.buckets).find((key) => (
        state.storage.buckets[key].selected
      ));

      return {
        user: state.user,
        objectsType: OBJECT_TYPES.members,
        selectedObjects: bucketKeySelected
          ? state.storage.buckets[bucketKeySelected].membersList : [],
      };
    }

    if (filesMatch) {
      bucket = 'personal';
      prefix = get(filesMatch, 'params.0', '') || '';
    }

    if (sharedBucketMatch) {
      prefix = get(sharedBucketMatch, 'params.0', '') || '';
      bucket = get(sharedBucketMatch, 'params.bucket', '') || '';
    }

    const objs = objectsSelector(
      state,
      bucket,
      prefix,
      '/',
    );

    const selectedObjs = objs.filter(({ selected }) => selected);

    return {
      user: state.user,
      objectsType: sharedBucketMatch && selectedObjs.length === 0
        ? OBJECT_TYPES.members : OBJECT_TYPES.files,
      selectedObjects: sharedBucketMatch && selectedObjs.length === 0
        ? state.storage.buckets[bucket].membersList : selectedObjs,
    };
  });

  const handleShare = () => {
    const bucket = get(selectedObjects, '[0].bucket');
    const itemPaths = selectedObjects.map((item) => item.key);
    dispatch(openModal(SHARING_MODAL, { bucket, itemPaths }));
  };

  return (
    <DetailsPanel id="storage-detail-panel">
      {
        selectedObjects.length === 0 ? (
          <Empty
            title={t('modules.storage.detailsPanel.title')}
            message={t(`modules.storage.detailsPanel.message.${objectsType}`)}
          />
        ) : (
          <>
            {
                objectsType === OBJECT_TYPES.files ? <Header objects={selectedObjects} /> : (
                  <AvatarHeader objects={selectedObjects} />
                )
              }
            <Divider />
            {/* eslint-disable-next-line react/jsx-props-no-spreading */}
            <ObjectDetails {...selectedObjects[0]} />
            <Divider />
            <SharePanel
              onShare={handleShare}
              collaborators={[{ username: user.username }]}
            />
          </>
        )
      }
    </DetailsPanel>
  );
};

export default StorageDetailsPanel;
