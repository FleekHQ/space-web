import React from 'react';
import get from 'lodash/get';
import { useSelector } from 'react-redux';
import { openShareModal } from '@events/modal';
import { modalKeys } from '../../../../../views/Modal/modals';
import Empty from './components/Empty';
import Header from './components/Header';
import SharePanel from './components/SharePanel';
import ObjectDetails from './components/ObjectDetails';

import useStyles from './styles';

const DetailsPanel = () => {
  const classes = useStyles();
  const selectedObjects = useSelector((state) => (
    state.storage.objects.filter(({ selected }) => selected)
  ));

  const onInviteMembers = () => {
    const bucket = get(selectedObjects, '[0].bucket');
    const itemPaths = selectedObjects.map((item) => item.key);

    const query = { bucket, itemPaths };

    openShareModal({ route: modalKeys.sharing, query });
  };

  const getContent = () => {
    if (selectedObjects.length === 0) {
      return <Empty />;
    }

    return (
      <>
        <Header objects={selectedObjects} />
        {selectedObjects.length === 1 && (
          <>
            <div className={classes.divider} />
            {/* eslint-disable-next-line react/jsx-props-no-spreading */}
            <ObjectDetails {...selectedObjects[0]} />
            <div className={classes.divider} />
            <SharePanel
              onInviteMembers={onInviteMembers}
              selectedObject={selectedObjects[0]}
            />
          </>
        )}
      </>
    );
  };

  return (
    <div id="detail-panel" className={classes.root}>
      {getContent()}
    </div>
  );
};
export default DetailsPanel;
