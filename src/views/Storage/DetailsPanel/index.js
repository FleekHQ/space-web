/* eslint-disable */
import React from 'react';
import get from 'lodash/get';
import { useSelector, useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { matchPath, useLocation } from 'react-router-dom';
import classnames from 'classnames';

import { objectsSelector, getShortAddress } from '@utils';
import { openModal, SHARING_MODAL } from '@shared/components/Modal/actions';
import DetailsPanel, {
  Empty,
  Header,
  Divider,
  SharePanel,
  AvatarHeader,
  ObjectDetails,
} from '@shared/components/DetailsPanel';

import { VIEW_MODES } from '@shared/components/DetailsPanel/constants';

import { OBJECT_TYPES } from './constants';
import useStyles from './styles';

const StorageDetailsPanel = () => {
  const viewMode = VIEW_MODES.LIGHT;

  const classes = useStyles();
  const { t } = useTranslation();
  const location = useLocation();
  const dispatch = useDispatch();
  const { user, objectsType, selectedObjects } = useSelector((state) => {
    let prefix;
    let bucket;

    const filesMatch = matchPath(location.pathname, { path: '/home/*' });
    const sharedBucketMatch = matchPath(location.pathname, { path: '/shared*' });

    if (filesMatch) {
      bucket = 'personal';
      prefix = get(filesMatch, 'params.0', '') || '';
    }

    if (sharedBucketMatch) {
      prefix = get(sharedBucketMatch, 'params.0', '') || '';
      bucket = 'shared-with-me';
    }

    const objs = objectsSelector(
      state,
      bucket,
      prefix,
      '',
    );

    const selectedObjs = objs.filter(({ selected }) => selected);

    return {
      user: state.user,
      objectsType: OBJECT_TYPES.files,
      selectedObjects: selectedObjs,
    };
  });

  return (
    <div
      className={classnames(classes.root, {
        [classes.expanded]: !!selectedObjects.length,
      })}
      data-prevent-details-panel-collapse="true"
    >
      <DetailsPanel
        viewMode={viewMode}
      >
        {
          objectsType === OBJECT_TYPES.files ? <Header viewMode={viewMode} objects={selectedObjects} /> : (
            <AvatarHeader viewMode={viewMode} objects={selectedObjects} />
          )
        }
        <Divider viewMode={viewMode} />
        {/* eslint-disable-next-line react/jsx-props-no-spreading */}
        <ObjectDetails viewMode={viewMode} {...selectedObjects[0]} />
        {
          selectedObjects.length === 1
          && selectedObjects[0].type === 'file'
          && selectedObjects[0].isAvailableInSpace
          && (
            <>
              <Divider viewMode={viewMode} />
              <SharePanel
                selectedObject={selectedObjects[0]}
                viewMode={viewMode}
                members={(
                  [
                    user,
                    ...selectedObjects[0].members.filter((member) => (
                      member.address !== user.address
                    )),
                  ].map((member) => {
                    const m = { ...member };

                    if (!m.username || (m.username && m.username.length === 0)) {
                      m.username = getShortAddress(m.address);
                    }

                    return m;
                  })
                )}
              />
            </>
          )
        }
      </DetailsPanel>
    </div>
  );
};

export default StorageDetailsPanel;
