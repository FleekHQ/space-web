import React from 'react';
import get from 'lodash/get';
import { useSelector } from 'react-redux';
import { matchPath, useLocation } from 'react-router-dom';

import { objectsSelector } from '@utils';
import { openShareModal } from '@events/modal';
import DetailsPanel, {
  Empty,
  Header,
  Divider,
  SharePanel,
  ObjectDetails,
} from '@shared/components/DetailsPanel';

import { modalKeys } from '../../Modal/modals';

const StorageDetailsPanel = () => {
  const location = useLocation();
  const { user, selectedObjects } = useSelector((state) => {
    let prefix;
    let bucket;

    const filesMatch = matchPath(location.pathname, { path: '/storage/files/*' });
    const sharedMatch = matchPath(location.pathname, { path: '/storage/shared-by', exact: true });
    const sharedBucketMatch = matchPath(location.pathname, { path: '/storage/shared-by/:bucket/*' });

    // TODO: check if a bucket is selected and return members pub keys
    if (sharedMatch) {
      return {
        user: state.user,
        selectedObjects: [],
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
      selectedObjects: sharedBucketMatch && selectedObjs.length === 0
        ? [/* bucket memmbers list */] : selectedObjs,
    };
  });

  const handleShare = () => {
    const bucket = get(selectedObjects, '[0].bucket');
    const itemPaths = selectedObjects.map((item) => item.key);

    const query = { bucket, itemPaths };

    openShareModal({ route: modalKeys.sharing, query });
  };

  return (
    <DetailsPanel id="storage-detail-panel">
      {
        selectedObjects.length === 0 ? <Empty /> : (
          <>
            <Header objects={selectedObjects} />
            <Divider />
            {/* eslint-disable-next-line react/jsx-props-no-spreading */}
            <ObjectDetails {...selectedObjects[0]} />
            <Divider />
            <SharePanel
              onShare={handleShare}
              collaborators={[
                {
                  username: user.username,
                },
                /* {
                  username: 'someuser1',
                },
                {
                  username: '4retggsdfgsfdfg',
                },
                {
                  username: 'sddavcsdgdfhfhjhmfhjsrgdfb',
                }, */
              ]}
            />
          </>
        )
      }
    </DetailsPanel>
  );
};

export default StorageDetailsPanel;
